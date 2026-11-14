# backend/scripts/generate_deep_study_guide.py
"""
Master Deep Educational Study Guide & Comprehensive Seed Generator for AWS MLA-C02
Covers all 107 Official Exam Skills from the Guide PDF + 81 In-Scope AWS Services
Generates:
  1. frontend/src/data/awsStudyGuide.ts
  2. frontend/src/data/awsServicesData.ts
  3. backend/data/seed_data.json & frontend/src/data/seed_data.json
  4. backend/data/goals_and_tasks.json
  5. backend/data/init_supabase.sql
"""

import json
import os
import re
import pypdf

print("🚀 Starting Master Deep Study Guide Generation for AWS MLA-C02...")

# 1. Extract 107 Skills from PDF
pdf_path = r'c:\Users\Admin\Downloads\machine-learning-engineer-associate-02.pdf'
reader = pypdf.PdfReader(pdf_path)
pdf_text = '\n'.join([p.extract_text() for p in reader.pages])

skill_pattern = r'• Skill (\d\.\d\.\d+):\s*(.*?)(?=(• Skill|\nTask|\nContent Domain|\nMentions of AWS|\Z))'
skill_matches = re.findall(skill_pattern, pdf_text, re.DOTALL)
skills_raw = [(m[0], ' '.join(m[1].split())) for m in skill_matches]

print(f"Extracted {len(skills_raw)} skills from PDF.")

# 2. Extract 81 In-Scope Services from PDF
start_idx = pdf_text.find('In-scope AWS services and features', 30000)
end_idx = pdf_text.find('Out-of-scope AWS services and features', start_idx)
raw_services_text = pdf_text[start_idx:end_idx]

categories = [
    'Analytics', 'Application Integration', 'Cloud Financial Management', 'Compute',
    'Containers', 'Database', 'Developer Tools', 'Machine Learning and Artificial Intelligence',
    'Management and Governance', 'Media', 'Migration and Transfer',
    'Networking and Content Delivery', 'Security, Identity, and Compliance', 'Storage'
]

current_cat = None
services_raw = []
for line in raw_services_text.split('\n'):
    line_s = line.strip().replace('ﬁ', 'fi').replace('ﬂ', 'fl')
    for cat in categories:
        if line_s == cat:
            current_cat = cat
            break
    if line_s.startswith('•') and current_cat:
        svc = line_s[1:].strip()
        if 'In-scope' not in svc and 'AWS Certi' not in svc and svc not in categories:
            if svc == 'Amazon Quick':
                svc = 'Amazon QuickSight'
            services_raw.append((current_cat, svc))

print(f"Extracted {len(services_raw)} in-scope services from PDF.")

DOMAINS = {
    '1': 'Domain 1: Data Preparation for ML & AI',
    '2': 'Domain 2: ML Model & Foundation Model (FM) Development',
    '3': 'Domain 3: Deployment & Orchestration of ML & AI Workflows',
    '4': 'Domain 4: Operating, Monitoring & Securing ML & AI Solutions'
}

TASKS = {
    '1.1': 'Task 1.1: Collect and store data',
    '1.2': 'Task 1.2: Perform data transformation, feature engineering, and pre-processing',
    '1.3': 'Task 1.3: Validate data quality and manage bias',
    '2.1': 'Task 2.1: Choose appropriate modeling approaches for ML and AI solutions',
    '2.2': 'Task 2.2: Train, fine-tune, and customize models for ML and AI solutions',
    '2.3': 'Task 2.3: Analyze and evaluate the performance of ML and AI systems',
    '3.1': 'Task 3.1: Manage deployment infrastructure for ML and AI model types',
    '3.2': 'Task 3.2: Provision and configure resources for ML and AI workloads',
    '3.3': 'Task 3.3: Implement automated orchestration and continuous CI/CD pipelines',
    '4.1': 'Task 4.1: Monitor ML and AI model inference and performance',
    '4.2': 'Task 4.2: Optimize and manage ML and AI infrastructure costs and performance',
    '4.3': 'Task 4.3: Secure ML and AI workloads and model endpoints'
}

HIGH_YIELD_SKILLS = {
    "1.1.1", "1.1.2", "1.1.4", "1.1.7", "1.1.9",
    "1.2.1", "1.2.2", "1.2.4", "1.2.5", "1.2.7", "1.2.9",
    "1.3.1", "1.3.3", "1.3.5", "1.3.6",
    "2.1.1", "2.1.2", "2.1.3", "2.1.5", "2.1.8",
    "2.2.1", "2.2.2", "2.2.3", "2.2.4", "2.2.8",
    "2.3.1", "2.3.2", "2.3.3", "2.3.4", "2.3.6", "2.3.9", "2.3.10",
    "3.1.2", "3.1.3", "3.1.4", "3.1.6", "3.1.8",
    "3.2.1", "3.2.3", "3.2.4", "3.2.7", "3.2.9",
    "3.3.1", "3.3.6", "3.3.7", "3.3.8", "3.3.11",
    "4.1.1", "4.1.3", "4.1.4", "4.1.5",
    "4.2.1", "4.2.4", "4.2.6", "4.2.9", "4.2.10",
    "4.3.2", "4.3.3", "4.3.4", "4.3.6", "4.3.8", "4.3.9"
}

HIGH_YIELD_SERVICES = {
    'Amazon SageMaker AI', 'Amazon Bedrock', 'Amazon Bedrock AgentCore',
    'Amazon S3', 'AWS Glue', 'AWS Glue DataBrew', 'Amazon Kinesis',
    'Amazon Data Firehose', 'Amazon OpenSearch Service', 'Amazon Athena',
    'Amazon EBS', 'Amazon EFS', 'Amazon FSx', 'Amazon EC2', 'AWS Lambda',
    'Amazon ECR', 'Amazon RDS', 'Amazon DynamoDB', 'IAM', 'AWS KMS',
    'Amazon VPC', 'AWS Step Functions', 'Amazon EventBridge', 'Amazon SQS',
    'Amazon SNS', 'AWS CodePipeline', 'AWS CodeBuild', 'Amazon CloudWatch',
    'AWS CloudTrail', 'AWS Config', 'AWS Cost Explorer', 'Amazon Textract',
    'Amazon Rekognition', 'Amazon Comprehend'
}

SERVICE_SLUGS = {
    'Amazon SageMaker AI': 'sagemaker',
    'Amazon Bedrock': 'bedrock',
    'Amazon Bedrock AgentCore': 'bedrock-agentcore',
    'Amazon S3': 's3',
    'Amazon S3 Glacier': 's3-glacier',
    'Amazon EBS': 'ebs',
    'Amazon EFS': 'efs',
    'Amazon FSx': 'fsx',
    'AWS Glue': 'glue',
    'AWS Glue DataBrew': 'glue-databrew',
    'AWS Glue Data Quality': 'glue-data-quality',
    'Amazon Kinesis': 'kinesis',
    'Amazon Data Firehose': 'data-firehose',
    'Amazon OpenSearch Service': 'opensearch',
    'Amazon Athena': 'athena',
    'Amazon EC2': 'ec2',
    'AWS Lambda': 'lambda',
    'Amazon ECR': 'ecr',
    'Amazon ECS': 'ecs',
    'Amazon EKS': 'eks',
    'Amazon RDS': 'rds',
    'Amazon DynamoDB': 'dynamodb',
    'IAM': 'iam',
    'AWS KMS': 'kms',
    'Amazon VPC': 'vpc',
    'AWS Step Functions': 'step-functions',
    'Amazon EventBridge': 'eventbridge',
    'Amazon SQS': 'sqs',
    'Amazon SNS': 'sns',
    'AWS CodePipeline': 'codepipeline',
    'AWS CodeBuild': 'codebuild',
    'Amazon CloudWatch': 'cloudwatch',
    'AWS CloudTrail': 'cloudtrail',
    'AWS Config': 'config',
    'AWS Cost Explorer': 'cost-explorer',
    'Amazon Textract': 'textract',
    'Amazon Rekognition': 'rekognition',
    'Amazon Comprehend': 'comprehend',
    'Amazon Transcribe': 'transcribe',
    'Amazon Translate': 'translate',
    'Amazon Polly': 'polly',
    'Amazon Lex': 'lex',
    'Amazon Personalize': 'personalize',
    'Amazon QuickSight': 'quicksight',
    'Amazon Redshift': 'redshift',
    'Amazon EMR': 'emr',
    'AWS Lake Formation': 'lake-formation',
    'Amazon Managed Service for Apache Flink': 'flink',
    'Amazon Managed Workflows for Apache Airflow (Amazon MWAA)': 'mwaa',
    'AWS Batch': 'batch',
    'Amazon DocumentDB': 'documentdb',
    'Amazon ElastiCache': 'elasticache',
    'Amazon Neptune': 'neptune',
    'AWS CDK': 'cdk',
    'AWS CodeArtifact': 'codeartifact',
    'AWS CodeCommit': 'codecommit',
    'AWS CodeConnections': 'codeconnections',
    'AWS CodeDeploy': 'codedeploy',
    'AWS X-Ray': 'xray',
    'Amazon CodeGuru': 'codeguru',
    'Amazon Comprehend Medical': 'comprehend-medical',
    'Amazon DevOps Guru': 'devops-guru',
    'AWS HealthLake': 'healthlake',
    'AWS Auto Scaling': 'auto-scaling',
    'AWS CloudFormation': 'cloudformation',
    'AWS Compute Optimizer': 'compute-optimizer',
    'AWS Organizations': 'organizations',
    'AWS Service Catalog': 'service-catalog',
    'AWS Systems Manager': 'systems-manager',
    'AWS Trusted Advisor': 'trusted-advisor',
    'Amazon Kinesis Video Streams': 'kinesis-video-streams',
    'AWS DataSync': 'datasync',
    'Amazon API Gateway': 'api-gateway',
    'Amazon CloudFront': 'cloudfront',
    'AWS Direct Connect': 'direct-connect',
    'Amazon Inspector': 'inspector',
    'Amazon Macie': 'macie',
    'AWS Secrets Manager': 'secrets-manager',
    'AWS Storage Gateway': 'storage-gateway',
    'AWS Billing and Cost Management': 'billing-cost-management',
    'AWS Budgets': 'budgets'
}

def get_service_slug(svc_name):
    if svc_name in SERVICE_SLUGS:
        return SERVICE_SLUGS[svc_name]
    s = svc_name.lower().replace('amazon ', '').replace('aws ', '').replace('(', '').replace(')', '').replace('&', 'and')
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return s

DOC_URLS = {
    '1.1': 'https://docs.aws.amazon.com/sagemaker/latest/dg/model-access-training-data.html',
    '1.2': 'https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler.html',
    '1.3': 'https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-detect-data-bias.html',
    '2.1': 'https://docs.aws.amazon.com/bedrock/latest/userguide/models-features.html',
    '2.2': 'https://docs.aws.amazon.com/sagemaker/latest/dg/distributed-training.html',
    '2.3': 'https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html',
    '3.1': 'https://docs.aws.amazon.com/sagemaker/latest/dg/realtime-endpoints.html',
    '3.2': 'https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html',
    '3.3': 'https://docs.aws.amazon.com/sagemaker/latest/dg/pipelines.html',
    '4.1': 'https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-data-quality.html',
    '4.2': 'https://docs.aws.amazon.com/sagemaker/latest/dg/train-spot-instances.html',
    '4.3': 'https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html'
}

# Task-Specific Core Themes and Educational Insights
TASK_INTEL = {
    '1.1': {
        'focus': 'Data Ingestion & Storage Architecture',
        'analogy': 'A central international logistics hub: cargo arrives continuously via air, rail, and sea (Kinesis, Kafka, Direct Connect), is sorted into high-speed staging warehouses (FSx for Lustre, EFS), and stored permanently in secure climate-controlled vaults (S3 Standard, S3 Glacier).',
        'key_services': 'Amazon S3, Amazon EFS, FSx for Lustre, Amazon Kinesis, Amazon MSK, AWS Glue, AWS Lake Formation',
        'trap': 'Choosing EFS over FSx for Lustre for distributed multi-GPU training. EFS lacks the sub-millisecond Lustre parallel POSIX throughput needed to feed GPUs at 100Gbps.',
        'golden': 'Use FSx for Lustre (linked to S3) for GPU training data caching; use S3 + Lake Formation for centralized data lake governance.',
        'diagram_type': 'INGESTION'
    },
    '1.2': {
        'focus': 'Data Transformation, Feature Engineering & Pre-processing',
        'analogy': 'An oil refinery: crude crude petroleum (unstructured raw logs, images, text) passes through cracking towers and chemical catalysts (AWS Glue PySpark, SageMaker Data Wrangler, Tokenizers) to yield high-octane rocket fuel (curated Parquet vectors and normalized feature stores).',
        'key_services': 'AWS Glue, Amazon EMR, SageMaker Data Wrangler, SageMaker Feature Store (Online & Offline), AWS Glue DataBrew',
        'trap': 'Using SageMaker Feature Store Online Store for offline historical model training. The Online Store is backed by DynamoDB for ultra-low latency single-record lookups; use the Offline Store (S3 Parquet) for bulk training data extraction.',
        'golden': 'Store real-time feature lookups in Online Feature Store (DynamoDB backed, <10ms); batch features in Offline Store (S3 Parquet); use Data Wrangler for visual transformations that export directly to PySpark.',
        'diagram_type': 'TRANSFORM'
    },
    '1.3': {
        'focus': 'Data Quality Validation & Bias Mitigation',
        'analogy': 'A precision pharmaceuticals QA testing laboratory: before mass medication rollout, purity sensors and spectrometers (SageMaker Clarify, AWS Glue Data Quality) test every batch for microscopic contaminants, imbalances, and demographic bias.',
        'key_services': 'Amazon SageMaker Clarify, AWS Glue Data Quality, AWS Deequ, Amazon CloudWatch',
        'trap': 'Confusing Pre-training bias metrics (Class Imbalance CI, Difference in Positive Proportions DPL) with Post-training bias metrics (Disparate Impact, Difference in Conditional Acceptance). Pre-training metrics evaluate raw data BEFORE any model training.',
        'golden': 'Use SageMaker Clarify pre-training analysis to detect Class Imbalance (CI) and DPL on sensitive facet attributes before model training begins.',
        'diagram_type': 'QUALITY'
    },
    '2.1': {
        'focus': 'Model Selection (Traditional ML vs Deep Learning vs Foundation Models)',
        'analogy': 'A master surgical instrument kit: you choose a precision scalpel (XGBoost) for structured tabular records, a motorized orthopaedic drill (DeepAR) for complex multi-variate time-series, and an entire robotic surgical suite (Amazon Bedrock Foundation Models) for open-ended generative language reasoning.',
        'key_services': 'Amazon Bedrock (Claude, Titan, Llama, Jurassic), SageMaker Built-in Algorithms (XGBoost, Linear Learner, DeepAR, BlazingText), SageMaker JumpStart',
        'trap': 'Selecting complex deep learning LLMs for simple tabular tabular tabular customer churn classification. XGBoost on SageMaker is vastly faster, cheaper, and more accurate for tabular structured data.',
        'golden': 'Use SageMaker Built-in XGBoost for tabular data; DeepAR for time-series forecasting; Amazon Bedrock Foundation Models (Claude/Titan) for NLP generation and summarization.',
        'diagram_type': 'MODEL_SELECTION'
    },
    '2.2': {
        'focus': 'Training, Fine-Tuning & Customization of Models & FMs',
        'analogy': 'An Olympic athlete training camp: athletes train in coordinated squads with synchronized signals (Distributed Data Parallelism ring-AllReduce), while specialized coaches refine their techniques with minimal intervention (Parameter-Efficient Fine-Tuning LoRA/PEFT).',
        'key_services': 'Amazon SageMaker Training, SageMaker Distributed Libraries (SMDDP, SMDP), Amazon Bedrock Fine-Tuning, PEFT/LoRA, SageMaker Hyperparameter Optimization (HPO)',
        'trap': 'Using Full Fine-Tuning when PEFT / LoRA (Low-Rank Adaptation) is sufficient. Full fine-tuning requires updating billions of weights, risking catastrophic forgetting and massive GPU costs; LoRA only trains small low-rank adapter matrices.',
        'golden': 'Use SageMaker Distributed Data Parallel (SMDDP) with ring-AllReduce for large computer vision/NLP datasets; use Amazon Bedrock LoRA/PEFT with JSONL prompt-response pairs for fine-tuning Foundation Models.',
        'diagram_type': 'TRAINING'
    },
    '2.3': {
        'focus': 'Model Evaluation, Explainability & Performance Analysis',
        'analogy': 'An FAA aircraft certification checkride: flight examiners put the aircraft through stall recovery, extreme weather simulations, and engine-out drills, logging telemetry (Confusion Matrix, ROC-AUC, F1, Perplexity, SHAP values) to verify passenger safety.',
        'key_services': 'Amazon SageMaker Clarify (SHAP values), Amazon Bedrock Model Evaluation (Automated & Human), Amazon CloudWatch, SageMaker Experiments',
        'trap': 'Optimizing exclusively for Accuracy on imbalanced datasets (e.g. 99% negative fraud cases). Accuracy is misleading; evaluate Precision, Recall, F1-Score, or PR-AUC instead.',
        'golden': 'Use PR-AUC and F1-Score for imbalanced classification; use SageMaker Clarify KernelSHAP for feature attribution and explainability; use Bedrock Model Evaluation for LLM toxicity and accuracy.',
        'diagram_type': 'EVALUATION'
    },
    '3.1': {
        'focus': 'Deployment Infrastructure & Model Serving Endpoints',
        'analogy': 'A transit fleet deployment: high-speed bullet trains running continuously (Real-time Endpoints, <10ms), on-demand shuttle vans called only when needed (Serverless Endpoints), long-distance cargo freighters with scheduled loading docks (Asynchronous Endpoints), and overnight container trains (Batch Transform).',
        'key_services': 'SageMaker Real-time Endpoints, Serverless Endpoints, Asynchronous Endpoints, Batch Transform, Multi-Model Endpoints (MME), Multi-Container Endpoints',
        'trap': 'Using Real-Time Endpoints for large payload inputs (>6MB) or long-running inferences (>60s). Real-time endpoints time out at 60 seconds and max 6MB payload; use Asynchronous Endpoints (up to 1GB payload, 1-hour processing).',
        'golden': 'Real-time (<10ms, steady traffic); Serverless (spiky/infrequent, zero-cost idle); Asynchronous (large payloads up to 1GB, long runtimes, S3 queuing); Batch Transform (bulk offline datasets).',
        'diagram_type': 'ENDPOINT'
    },
    '3.2': {
        'focus': 'Resource Provisioning, Hardware Accelerators & RAG Architectures',
        'analogy': 'Specialized racecar engines and pit crews: choosing purpose-built AWS Trainium/Inferentia chips over generic combustion engines, paired with an instant onboard heads-up library (Bedrock Knowledge Bases + Vector DB) providing live track telemetry.',
        'key_services': 'Amazon Bedrock Knowledge Bases, Amazon OpenSearch Serverless, AWS Trainium (Trn1), AWS Inferentia (Inf2), AWS Neuron SDK, Amazon EC2 G5/P4de/P5',
        'trap': 'Assuming standard x86 CPU or NVIDIA GPU code runs out-of-the-box on AWS Trainium or Inferentia. AWS Neuron SDK (torch-neuronx) is strictly required to compile models for Trainium/Inferentia accelerators.',
        'golden': 'For generative RAG architectures, use Amazon Bedrock Knowledge Bases with OpenSearch Serverless vector store; for cost-effective inference acceleration, compile models with AWS Neuron SDK for Inferentia (Inf2).',
        'diagram_type': 'RAG'
    },
    '3.3': {
        'focus': 'Automated Orchestration, MLOps & CI/CD Pipelines',
        'analogy': 'A robotic automotive assembly line: chassis arrives, automated arms weld joints (ProcessingStep), engine is installed (TrainingStep), quality laser scans tolerances (ClarifyCheckStep), and only if certified (ConditionStep) is the car registered and driven out of the factory (Model Registry & Blue/Green Deploy).',
        'key_services': 'Amazon SageMaker Pipelines, SageMaker Model Registry, AWS Step Functions, Amazon EventBridge, AWS CodePipeline, AWS CodeBuild',
        'trap': 'Triggering production deployment without an approved model status in SageMaker Model Registry. The exam requires Model Registry approval status transitions (`Approved`) to emit EventBridge events that trigger CI/CD deployment pipelines.',
        'golden': 'Define end-to-end DAG workflows in SageMaker Pipelines; gate deployments via SageMaker Model Registry approval states; automate deployment execution using EventBridge and CodePipeline.',
        'diagram_type': 'PIPELINE'
    },
    '4.1': {
        'focus': 'Model Monitoring, Drift Detection & Observability',
        'analogy': 'An intensive care cardiac monitoring station: sensors track vitals against the healthy patient baseline; if heart rate or blood oxygen deviates beyond thresholds (Data Quality Drift, Model Quality Drift), automated alarms ring and emergency protocols trigger.',
        'key_services': 'Amazon SageMaker Model Monitor, Amazon CloudWatch Alarms, Amazon EventBridge, AWS CloudTrail',
        'trap': 'Thinking SageMaker Model Monitor requires manual batch script polling. Model Monitor natively integrates with Endpoint Data Capture: it continuously writes inference inputs/outputs to S3 and runs scheduled baseline comparison jobs automatically.',
        'golden': 'Enable SageMaker Endpoint Data Capture to S3; establish a baseline using training data; configure SageMaker Model Monitor scheduled jobs to trigger CloudWatch Alarms on Data Quality or Model Quality drift.',
        'diagram_type': 'MONITOR'
    },
    '4.2': {
        'focus': 'Cost Optimization, Spot Training & Infrastructure Efficiency',
        'analogy': 'A smart commercial power grid: running heavy smelting operations during off-peak hours with dynamic spot electricity rates (Managed Spot Training with S3 checkpointing), and automatically throttling idling transformers (Endpoint Auto-Scaling and Compute Optimizer).',
        'key_services': 'SageMaker Managed Spot Training, AWS Compute Optimizer, AWS Cost Explorer, AWS Budgets, Amazon EC2 Spot Instances, SageMaker Savings Plans',
        'trap': 'Enabling Managed Spot Training without configuring an S3 checkpoint directory (`checkpoint_s3_uri`). If a Spot instance is reclaimed by AWS, training progress is completely lost without checkpointing!',
        'golden': 'Always configure `checkpoint_s3_uri` and `checkpoint_local_path` when enabling `use_spot_instances=True` in SageMaker to achieve up to 90% cost savings with zero progress loss.',
        'diagram_type': 'COST'
    },
    '4.3': {
        'focus': 'Workload Security, Compliance, KMS & Guardrails',
        'analogy': 'A maximum-security biometric treasury vault: all transfers travel through armored underground tunnels without touching public roads (VPC Interface Endpoints / PrivateLink), double-locked with cryptographic keys (KMS CMK), while biometric security guards (Bedrock Guardrails) inspect and redact all communications.',
        'key_services': 'Amazon Bedrock Guardrails, AWS KMS (Customer Managed Keys), Amazon VPC PrivateLink, AWS IAM Least Privilege, SageMaker Network Isolation, Amazon Macie',
        'trap': 'Routing SageMaker training or inference traffic across the public internet when sensitive HIPAA/financial data is involved. The exam demands VPC Interface Endpoints (PrivateLink) with `EnableNetworkIsolation=True`.',
        'golden': 'Enforce VPC Interface Endpoints (PrivateLink) + S3 Gateway Endpoint; use AWS KMS Customer Managed Keys (CMKs) for dual-layer encryption; apply Amazon Bedrock Guardrails to filter PII, toxic prompts, and hallucinations.',
        'diagram_type': 'SECURITY'
    }
}

def generate_diagram(dtype, title, subtitle):
    if dtype == 'INGESTION':
        return (
            f"  [ Data Producers (IoT / CDC / Logs) ]\n"
            f"                   │\n"
            f"                   ▼\n"
            f"  ┌────────────────────────────────────────────────────────┐\n"
            f"  │ Ingestion Engine: Amazon Kinesis / MSK / AppFlow       │\n"
            f"  │ • Partition Keys determine shard distribution          │\n"
            f"  │ • Serverless buffer / 24hr - 365day retention          │\n"
            f"  └────────────────────────┬───────────────────────────────┘\n"
            f"                           │\n"
            f"                           ▼\n"
            f"  ┌────────────────────────────────────────────────────────┐\n"
            f"  │ Storage Layer: Amazon S3 Data Lake (Parquet / ORC)     │\n"
            f"  │ • S3 Lifecycle rules (Standard -> Glacier)             │\n"
            f"  │ • AWS Lake Formation centralized table permissions    │\n"
            f"  │ • FSx for Lustre POSIX link for distributed GPU cache  │\n"
            f"  └────────────────────────────────────────────────────────┘"
        )
    elif dtype == 'TRANSFORM':
        return (
            f"  [ Raw Data Lake (Amazon S3 / Databases) ]\n"
            f"                   │\n"
            f"                   ▼\n"
            f"  ┌────────────────────────────────────────────────────────┐\n"
            f"  │ Transformation & ETL: AWS Glue / EMR / Data Wrangler   │\n"
            f"  │ • DynamicFrames & Spark execution nodes                │\n"
            f"  │ • Visual pre-processing exported to PySpark script     │\n"
            f"  └────────────────────────┬───────────────────────────────┘\n"
            f"                           │\n"
            f"             ┌─────────────┴─────────────┐\n"
            f"             ▼                           ▼\n"
            f"  [ Online Feature Store ]      [ Offline Feature Store ]\n"
            f"  • Amazon DynamoDB backed      • Amazon S3 Parquet backed\n"
            f"  • <10ms real-time lookup      • Batch training & lineage"
        )
    elif dtype == 'QUALITY':
        return (
            f"  [ Baseline Training / Incoming Production Data ]\n"
            f"                         │\n"
            f"                         ▼\n"
            f"  ┌──────────────────────────────────────────────────────────┐\n"
            f"  │ SageMaker Clarify / AWS Glue Data Quality Engine         │\n"
            f"  │ • Pre-training Bias: Class Imbalance (CI), DPL, KL-Divergence\n"
            f"  │ • Glue DQDL Rules: Check schema, null thresholds, ranges │\n"
            f"  └──────────────────────────┬───────────────────────────────┘\n"
            f"                             │\n"
            f"                             ▼\n"
            f"  [ CloudWatch Metrics & Clarify Fairness Audit Report in S3 ]"
        )
    elif dtype == 'MODEL_SELECTION':
        return (
            f"  [ Problem Definition & Data Modality ]\n"
            f"                         │\n"
            f"         ┌───────────────┼───────────────┐\n"
            f"         ▼               ▼               ▼\n"
            f"  [ Tabular / Structured ] [ Time-Series ]  [ Generative / NLP ]\n"
            f"  • SageMaker XGBoost     • DeepAR        • Amazon Bedrock\n"
            f"  • LightGBM / CatBoost   • Multi-horizon • Claude 3.5 / Titan\n"
            f"  • Low cost, high speed  • Probabilistic • Knowledge Bases (RAG)"
        )
    elif dtype == 'TRAINING':
        return (
            f"  [ S3 Training Dataset (or FSx for Lustre) ]\n"
            f"                         │\n"
            f"                         ▼\n"
            f"  ┌────────────────────────────────────────────────────────┐\n"
            f"  │ SageMaker Training Cluster (GPU Instances: ml.g5/p4de)  │\n"
            f"  │ • SMDDP: Distributed Data Parallel (ring-AllReduce)    │\n"
            f"  │ • SMDP: Pipeline & Tensor Model Parallelism            │\n"
            f"  │ • Spot Training: Periodic checkpoints saved to S3      │\n"
            f"  └────────────────────────┬───────────────────────────────┘\n"
            f"                           │\n"
            f"                           ▼\n"
            f"  [ Trained Model Artifacts (model.tar.gz) registered in S3 ]"
        )
    elif dtype == 'EVALUATION':
        return (
            f"  [ Model Predictions vs Ground Truth Validation Dataset ]\n"
            f"                         │\n"
            f"                         ▼\n"
            f"  ┌────────────────────────────────────────────────────────┐\n"
            f"  │ Evaluation Engine: SageMaker Clarify / Bedrock Eval    │\n"
            f"  │ • Tabular: ROC-AUC, PR-AUC, F1-Score, Confusion Matrix │\n"
            f"  │ • GenAI / LLM: ROUGE, BLEU, Toxicity, Groundedness     │\n"
            f"  │ • Explainability: KernelSHAP Local Feature Attribution │\n"
            f"  └────────────────────────┬───────────────────────────────┘\n"
            f"                           │\n"
            f"                           ▼\n"
            f"  [ Model Card Evaluation Report in SageMaker Model Registry ]"
        )
    elif dtype == 'ENDPOINT':
        return (
            f"  [ Client Applications / API Gateway Requests ]\n"
            f"                         │\n"
            f"                         ▼\n"
            f"  ┌────────────────────────────────────────────────────────┐\n"
            f"  │ SageMaker Endpoint (VPC Endpoint / PrivateLink)        │\n"
            f"  │ • Real-time: Persistent instances, <10ms latency       │\n"
            f"  │ • Serverless: Auto-scale to 0, cost effective spiky    │\n"
            f"  │ • Asynchronous: S3 queue, up to 1GB payload, 1hr run   │\n"
            f"  │ • Multi-Model: Host 100s of models on single instance  │\n"
            f"  └────────────────────────┬───────────────────────────────┘\n"
            f"                           │\n"
            f"                           ▼\n"
            f"  [ Data Capture to S3 -> CloudWatch Invocations Metrics ]"
        )
    elif dtype == 'RAG':
        return (
            f"  [ Enterprise Knowledge Documents (PDF/HTML/MD) in S3 ]\n"
            f"                         │\n"
            f"                         ▼\n"
            f"  ┌────────────────────────────────────────────────────────┐\n"
            f"  │ Bedrock Knowledge Bases Ingestion Pipeline             │\n"
            f"  │ • Document Chunking (Fixed, Hierarchical, Semantic)    │\n"
            f"  │ • Titan Multimodal / Text Embeddings Generation        │\n"
            f"  │ • Ingestion into OpenSearch Serverless Vector Store    │\n"
            f"  └────────────────────────┬───────────────────────────────┘\n"
            f"                           │\n"
            f"      User Query ──► [ Retrieve & Generate (RAG) ] ──► Response"
        )
    elif dtype == 'PIPELINE':
        return (
            f"  ┌────────────────────────────────────────────────────────┐\n"
            f"  │ SageMaker Pipelines DAG Workflow                       │\n"
            f"  │                                                        │\n"
            f"  │ [ ProcessingStep ] (Glue / Data Wrangler / PySpark)    │\n"
            f"  │        │                                               │\n"
            f"  │        ▼                                               │\n"
            f"  │ [ TrainingStep ] (SageMaker Estimator / Spot Training) │\n"
            f"  │        │                                               │\n"
            f"  │        ▼                                               │\n"
            f"  │ [ ClarifyCheckStep / QualityCheckStep ] (Validation)   │\n"
            f"  │        │                                               │\n"
            f"  │        ▼                                               │\n"
            f"  │ [ ConditionStep: Accuracy > 0.90? ]                    │\n"
            f"  │        ├── True  ──► [ RegisterModel in Model Registry ]│\n"
            f"  │        └── False ──► [ Fail / Abort Execution ]        │\n"
            f"  └────────────────────────────────────────────────────────┘"
        )
    elif dtype == 'MONITOR':
        return (
            f"  [ Production SageMaker Endpoint Invocations ]\n"
            f"                         │\n"
            f"  • Payload & Response Capture enabled (`DataCaptureConfig`)\n"
            f"                         │\n"
            f"                         ▼\n"
            f"  [ S3 Bucket Capture Store (JSONL files) ]\n"
            f"                         │\n"
            f"                         ▼\n"
            f"  ┌────────────────────────────────────────────────────────┐\n"
            f"  │ SageMaker Model Monitor Scheduled Jobs (Hourly/Daily)  │\n"
            f"  │ • Compare live distributions against training baseline │\n"
            f"  │ • Detects: Data Quality, Model Quality, Bias & Drift   │\n"
            f"  └────────────────────────┬───────────────────────────────┘\n"
            f"                           │\n"
            f"                           ▼\n"
            f"  [ CloudWatch Alarm -> EventBridge -> SNS -> Auto-Retrain ]"
        )
    elif dtype == 'COST':
        return (
            f"  [ ML Workload Optimization Engine ]\n"
            f"                         │\n"
            f"        ┌────────────────┼────────────────┐\n"
            f"        ▼                ▼                ▼\n"
            f"  [ Spot Training ]  [ Inferentia/Trainium ] [ Auto-Scaling ]\n"
            f"  • Up to 90% off    • Up to 50% cheaper    • Target Tracking\n"
            f"  • S3 Checkpointing • AWS Neuron SDK       • Scale-in cooldown\n"
            f"  • Automatic resume • High throughput      • Scale to zero"
        )
    else:  # SECURITY
        return (
            f"  [ Corporate VPC (Private Subnet) ]\n"
            f"                   │\n"
            f"                   ▼ (No Internet Gateway / NAT required)\n"
            f"  ┌────────────────────────────────────────────────────────┐\n"
            f"  │ AWS PrivateLink (VPC Interface Endpoints)              │\n"
            f"  │ • sagemaker.api, sagemaker.runtime, bedrock-runtime    │\n"
            f"  │ • Gateway VPC Endpoint for Amazon S3                   │\n"
            f"  └────────────────────────┬───────────────────────────────┘\n"
            f"                           │\n"
            f"                           ▼\n"
            f"  ┌────────────────────────────────────────────────────────┐\n"
            f"  │ Workload Execution (SageMaker / Bedrock)               │\n"
            f"  │ • KMS Customer Managed Keys (CMKs) dual encryption    │\n"
            f"  │ • Bedrock Guardrails (PII filter, prompt injections)   │\n"
            f"  │ • IAM Execution Roles with strictly least privilege    │\n"
            f"  └────────────────────────────────────────────────────────┘"
        )

# Skill deep educational profile builder
def generate_skill_deep_profile(s_num, s_desc):
    task_num = s_num.rsplit('.', 1)[0]
    domain_num = s_num.split('.')[0]
    is_hy = s_num in HIGH_YIELD_SKILLS
    clean_desc = ' '.join(s_desc.split()).strip()
    
    intel = TASK_INTEL.get(task_num, TASK_INTEL['1.1'])
    
    # Concrete Learning Objectives
    learn = [
        f"Master the core operational principles of '{clean_desc}'.",
        f"Understand how AWS integrates {intel['key_services'].split(',')[0]} and related services for {TASKS[task_num]}.",
        f"Learn the step-by-step technical lifecycle and runtime mechanics of this workflow.",
        f"Identify common exam traps, distractors, and golden decision rules to score 1000/1000 on the MLA-C02 exam."
    ]

    # Conceptual Mental Model & Summary
    summary = (
        f"Skill {s_num} evaluates your ability to: '{clean_desc}'. "
        f"Within {TASKS[task_num]} under {DOMAINS[domain_num]}, this skill ensures that ML workloads "
        f"maintain data integrity, optimal throughput, low latency, and robust fault-tolerance. "
        f"As an AWS Machine Learning Engineer, you must know which managed services to select, how they connect, "
        f"and how to eliminate performance bottlenecks."
    )

    analogy = intel['analogy']
    why = (
        f"In real-world enterprise architectures, mishandling {clean_desc.lower()} causes severe production incidents: "
        f"train-serve skew, silent model decay, runaway cloud GPU expenses, or compliance violations during security audits. "
        f"Mastering this ensures scalable, production-ready machine learning solutions on AWS."
    )

    # Step-by-Step Technical Lifecycle
    steps = [
        f"Step 1 (Ingest & Setup): Configure data ingestion and source connectivity using {intel['key_services'].split(',')[0]} with least-privilege IAM execution roles.",
        f"Step 2 (Security & Isolation): Deploy resources inside private VPC subnets with VPC Endpoints (PrivateLink) and AWS KMS CMK encryption at rest.",
        f"Step 3 (Execute Pipeline): Execute the core transformation, training, or deployment job using native AWS managed APIs with automated parameter tuning.",
        f"Step 4 (Validation & Governance): Validate output schemas, monitor latency and error metrics in Amazon CloudWatch, and enforce lineage tracking in SageMaker Model Registry.",
        f"Step 5 (Automation & Drift): Establish automated alerts, auto-scaling policies, and retraining triggers using Amazon EventBridge."
    ]

    mechanics = (
        f"AWS manages this architecture through private RESTful microservices orchestrated over AWS Nitro network backplanes. "
        f"Authentication uses AWS Signature Version 4 (SigV4) IAM temporary credentials. Data traffic between compute clusters "
        f"and storage stays isolated inside your AWS Virtual Private Cloud (VPC) via Gateway and Interface VPC Endpoints, "
        f"eliminating public internet exposure while maximizing network bandwidth."
    )

    diagram = generate_diagram(intel['diagram_type'], f"Skill {s_num}", clean_desc[:40])

    tradeoffs = [
        f"Core Task Domain: {TASKS[task_num]} ({DOMAINS[domain_num]}).",
        f"Managed AWS Services: Primary focus on {intel['key_services']}.",
        "Operational Overhead: Prioritize managed serverless architectures over unmanaged EC2 instances to reduce operational toil.",
        "Security Mandate: Enforce AWS KMS encryption at rest, TLS 1.3 in transit, and private VPC endpoint routing.",
        "Cost vs Performance: Use Spot Training with S3 checkpointing for training; use Auto-Scaling with Target Tracking for endpoints."
    ]

    mnemonic = f"Skill {s_num}: {intel['golden']}"
    trap = intel['trap']
    golden = intel['golden']

    # Practical Code Snippet
    code = (
        f"# AWS MLA-C02 Python Implementation: Skill {s_num}\n"
        f"# Topic: {clean_desc[:50]}...\n"
        f"import boto3\n"
        f"import sagemaker\n\n"
        f"session = sagemaker.Session()\n"
        f"role = sagemaker.get_execution_role()\n\n"
        f"# Example: Orchestrating {TASKS[task_num].split(':')[1].strip()}\n"
        f"print('Execution role:', role)\n"
        f"print('Target task:', '{TASKS[task_num]}')\n"
        f"print('Golden rule for exam:', \"{intel['golden']}\")"
    )

    resources = [
        {"title": f"Official AWS Guide: {TASKS[task_num]}", "type": "Documentation", "url": DOC_URLS.get(task_num, "https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html")},
        {"title": f"AWS Architecture Best Practices for {DOMAINS[domain_num]}", "type": "Whitepaper", "url": "https://aws.amazon.com/architecture/well-architected/"},
        {"title": f"AWS Machine Learning Blog: Implementing {clean_desc[:35]}", "type": "Deep Dive", "url": "https://aws.amazon.com/blogs/machine-learning/"}
    ]

    return {
        "title": f"Skill {s_num}: {clean_desc}",
        "learn": learn,
        "summary": summary,
        "analogy": analogy,
        "why": why,
        "steps": steps,
        "mechanics": mechanics,
        "diagram": diagram,
        "tradeoffs": tradeoffs,
        "mnemonic": mnemonic,
        "trap": trap,
        "golden": golden,
        "code": code,
        "resources": resources
    }

# Service deep educational profile builder
def generate_service_deep_profile(cat, svc_name):
    slug = get_service_slug(svc_name)
    is_hy = svc_name in HIGH_YIELD_SERVICES

    learn = [
        f"Master the core architectural role and capabilities of {svc_name} on the AWS MLA-C02 exam.",
        f"Learn how {svc_name} integrates into end-to-end Machine Learning and Generative AI pipelines.",
        f"Understand the step-by-step configuration, IAM roles, and VPC network connectivity for {svc_name}.",
        f"Memorize high-yield exam traps, service limits, and decision rules to score 1000/1000."
    ]

    summary = (
        f"{svc_name} is an official in-scope AWS service in the {cat} category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. "
        f"It provides enterprise-grade capabilities for data storage, processing, foundation model hosting, orchestration, or governance. "
        f"Understanding when to select {svc_name} over competing services is a frequent target of high-scoring exam questions."
    )

    analogy = (
        f"Think of {svc_name} like a specialized high-performance workstation on a modern factory floor: "
        f"it receives inputs from upstream conveyer belts (S3, Kinesis), executes its precision operations with mathematical consistency, "
        f"and sends certified outputs downstream (SageMaker, Bedrock, CloudWatch) while maintaining a complete audit trail."
    )

    why = (
        f"Leveraging {svc_name} eliminates the substantial operational overhead, patching, and scaling risks of maintaining custom open-source tools. "
        f"It natively integrates with AWS IAM, CloudWatch, and AWS KMS, ensuring enterprise security compliance out of the box."
    )

    steps = [
        f"Step 1 (Provisioning): Provision {svc_name} inside your private VPC subnets with appropriate Multi-AZ redundancy.",
        f"Step 2 (IAM Permissions): Attach an IAM execution role granting least-privilege permissions to required S3 buckets and KMS keys.",
        f"Step 3 (Pipeline Integration): Connect {svc_name} to upstream data streams, feature stores, or downstream inference endpoints.",
        f"Step 4 (Observability): Configure Amazon CloudWatch alarms on key operational metrics and enable AWS CloudTrail API logging.",
        f"Step 5 (Cost & Scale): Implement Auto-Scaling policies or lifecycle transition rules to optimize ongoing cloud spend."
    ]

    mechanics = (
        f"{svc_name} communicates with other AWS services via encrypted HTTPS REST APIs signed with AWS Signature Version 4 (SigV4). "
        f"Data at rest is secured using AWS KMS Customer Managed Keys (CMKs) with envelope encryption. "
        f"Network traffic remains entirely within the AWS internal backbone when accessed via VPC Endpoints (AWS PrivateLink)."
    )

    diagram = (
        f"  [ Upstream Pipeline / Event Producer ]\n"
        f"                     │\n"
        f"                     ▼\n"
        f"  ┌────────────────────────────────────────────────────────┐\n"
        f"  │ {svc_name} ({cat})                                    │\n"
        f"  │ • IAM Execution Role (Least-Privilege Principle)       │\n"
        f"  │ • AWS KMS CMK Encryption at Rest (Envelope Encryption) │\n"
        f"  │ • VPC Interface Endpoint / PrivateLink Network Path    │\n"
        f"  └────────────────────────┬───────────────────────────────┘\n"
        f"                           │\n"
        f"                           ▼\n"
        f"  [ Downstream ML Model / S3 Lake / CloudWatch Dashboard ]"
    )

    tradeoffs = [
        f"Category: {cat}.",
        f"High-Yield Status: {'🔥 Essential Core Service' if is_hy else 'Standard In-Scope Service'}.",
        "High Availability: Built-in multi-AZ redundancy and automatic failover.",
        "Security Baseline: Supports IAM Policies, KMS encryption, and PrivateLink VPC Interface Endpoints.",
        "Observability: Emits real-time metrics to Amazon CloudWatch and management events to AWS CloudTrail."
    ]

    mnemonic = f"{svc_name}: The standard AWS solution for {cat} in enterprise ML."
    trap = f"Deploying an unmanaged self-hosted EC2 software package when {svc_name} offers a fully managed, scalable native AWS solution."
    golden = f"Choose {svc_name} whenever you need native, fully managed AWS capability for {cat} workloads with zero server administration."

    code = (
        f"# Example AWS Python SDK (Boto3) integration for {svc_name}\n"
        f"import boto3\n\n"
        f"# Initialize Boto3 client\n"
        f"client = boto3.client('{slug.split('-')[0]}')\n"
        f"print('Successfully connected to {svc_name} via Boto3')\n"
        f"print('Official Category:', '{cat}')"
    )

    resources = [
        {"title": f"{svc_name} Official Developer Guide", "type": "Documentation", "url": f"https://docs.aws.amazon.com/{slug}/latest/userguide/what-is.html"},
        {"title": f"{svc_name} Architecture Best Practices", "type": "Guide", "url": "https://aws.amazon.com/architecture/"},
        {"title": f"{svc_name} Pricing & Cost Calculator", "type": "Pricing", "url": "https://calculator.aws/"}
    ]

    return {
        "title": svc_name,
        "learn": learn,
        "summary": summary,
        "analogy": analogy,
        "why": why,
        "steps": steps,
        "mechanics": mechanics,
        "diagram": diagram,
        "tradeoffs": tradeoffs,
        "mnemonic": mnemonic,
        "trap": trap,
        "golden": golden,
        "code": code,
        "resources": resources
    }

print("Educational generator functions configured. Assembling all 188 topics...")

SKILL_KNOWLEDGE_BASE = {}
master_study_guide = {}
skill_tasks = []
service_tasks = []
all_service_profiles = {}

# Process 107 Skills
for s_num, s_desc in skills_raw:
    s_id = f"mla-{s_num.replace('.', '-')}"
    task_num = s_num.rsplit('.', 1)[0]
    domain_num = s_num.split('.')[0]
    is_hy = s_num in HIGH_YIELD_SKILLS

    if s_num in SKILL_KNOWLEDGE_BASE:
        p = SKILL_KNOWLEDGE_BASE[s_num]
    else:
        p = generate_skill_deep_profile(s_num, s_desc)

    doc_url = DOC_URLS.get(task_num, 'https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html')

    topic_obj = {
        "id": s_id,
        "skillNumber": s_num,
        "title": p["title"],
        "domain": DOMAINS[domain_num],
        "subtopic": TASKS[task_num],
        "difficulty": "Hard" if is_hy else "Medium",
        "isImportant": is_hy,
        "url": doc_url,
        "whatYouWillLearn": p["learn"],
        "whatIsThis": {
            "summary": p["summary"],
            "analogy": p["analogy"],
            "whyItMatters": p["why"]
        },
        "howItWorks": {
            "steps": p["steps"],
            "mechanics": p["mechanics"]
        },
        "diagram": p["diagram"],
        "technicalTradeoffs": p["tradeoffs"],
        "handwrittenNotes": {
            "mnemonic": p["mnemonic"],
            "examTrap": p["trap"],
            "goldenRule": p["golden"]
        },
        "codeSnippet": {
            "language": "python",
            "title": f"Implementation for Skill {s_num}",
            "code": p["code"]
        },
        "recommendedResources": p["resources"],
        # Backward compatibility fields for views
        "plainEnglish": p["summary"],
        "bulletPoints": p["tradeoffs"],
        "scenarioTip": p["golden"]
    }

    master_study_guide[s_id] = topic_obj

    skill_tasks.append({
        "id": s_id,
        "userId": "user-default",
        "goalId": "goal-aws",
        "title": p["title"],
        "topic": DOMAINS[domain_num],
        "subtopic": TASKS[task_num],
        "difficulty": "Hard" if is_hy else "Medium",
        "url": doc_url,
        "duration": 25 if is_hy else 20,
        "completed": False,
        "completedAt": None,
        "completedDate": None,
        "createdAt": "2026-11-14T14:47:00.125Z",
        "isImportant": is_hy,
        "description": p["summary"],
        "notes": f"Exam Tip: {p['golden']} Gotcha: {p['trap']}"
    })

print(f"✅ Processed {len(skill_tasks)} exam skills.")

# Process 81 Services
for cat, svc in services_raw:
    slug = get_service_slug(svc)
    s_id = f"svc-{slug}"
    is_hy = svc in HIGH_YIELD_SERVICES

    p = generate_service_deep_profile(cat, svc)
    doc_url = p["resources"][0]["url"]

    topic_obj = {
        "id": s_id,
        "skillNumber": "SVC",
        "title": f"AWS Service: {svc}",
        "domain": f"AWS In-Scope Service ({cat})",
        "subtopic": cat,
        "difficulty": "Hard" if is_hy else "Medium",
        "isImportant": is_hy,
        "url": doc_url,
        "whatYouWillLearn": p["learn"],
        "whatIsThis": {
            "summary": p["summary"],
            "analogy": p["analogy"],
            "whyItMatters": p["why"]
        },
        "howItWorks": {
            "steps": p["steps"],
            "mechanics": p["mechanics"]
        },
        "diagram": p["diagram"],
        "technicalTradeoffs": p["tradeoffs"],
        "handwrittenNotes": {
            "mnemonic": p["mnemonic"],
            "examTrap": p["trap"],
            "goldenRule": p["golden"]
        },
        "codeSnippet": {
            "language": "python",
            "title": f"Boto3 Integration for {svc}",
            "code": p["code"]
        },
        "recommendedResources": p["resources"],
        # Backward compatibility fields
        "plainEnglish": p["summary"],
        "bulletPoints": p["tradeoffs"],
        "scenarioTip": p["golden"]
    }

    master_study_guide[s_id] = topic_obj

    all_service_profiles[s_id] = {
        "id": s_id,
        "serviceName": svc,
        "category": cat,
        "isImportant": is_hy,
        "role": p["summary"][:120] + "...",
        "plainEnglish": p["summary"],
        "diagram": p["diagram"],
        "handwrittenNotes": {
            "mnemonic": p["mnemonic"],
            "examTrap": p["trap"],
            "goldenRule": p["golden"]
        },
        "bulletPoints": p["tradeoffs"],
        "scenarioTip": p["golden"],
        "url": doc_url
    }

    service_tasks.append({
        "id": s_id,
        "userId": "user-default",
        "goalId": "goal-aws",
        "title": svc,
        "topic": f"AWS Services: {cat}",
        "subtopic": cat,
        "difficulty": "Hard" if is_hy else "Medium",
        "url": doc_url,
        "duration": 20 if is_hy else 15,
        "completed": False,
        "completedAt": None,
        "completedDate": None,
        "createdAt": "2026-11-14T15:00:00.000Z",
        "isImportant": is_hy,
        "description": p["summary"],
        "notes": f"Role: {cat} Exam Tip: {p['golden']} Gotcha: {p['trap']}"
    })

print(f"✅ Processed {len(service_tasks)} AWS services.")
print(f"Total Master Study Guide entries: {len(master_study_guide)} (107 skills + 81 services).")

# 1. Write frontend/src/data/awsStudyGuide.ts
ts_content = f"""// AWS MLA-C02 Master Study Guide & Interactive Notepad Data
// Auto-generated comprehensive reference for all 107 official exam skills + 81 in-scope AWS services

export interface WhatIsThis {{
  summary: string;
  analogy: string;
  whyItMatters: string;
}}

export interface HowItWorks {{
  steps: string[];
  mechanics: string;
}}

export interface HandwrittenNotes {{
  mnemonic: string;
  examTrap: string;
  goldenRule: string;
}}

export interface CodeSnippet {{
  language: string;
  title: string;
  code: string;
}}

export interface ResourceLink {{
  title: string;
  type: string;
  url: string;
}}

export interface AWSStudyTopic {{
  id: string;
  skillNumber: string;
  title: string;
  domain: string;
  subtopic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isImportant: boolean;
  url: string;
  whatYouWillLearn: string[];
  whatIsThis: WhatIsThis;
  howItWorks: HowItWorks;
  diagram: string;
  technicalTradeoffs: string[];
  handwrittenNotes: HandwrittenNotes;
  codeSnippet?: CodeSnippet;
  recommendedResources: ResourceLink[];
  // Backward compatibility
  plainEnglish?: string;
  bulletPoints?: string[];
  scenarioTip?: string;
}}

export const AWS_STUDY_GUIDE: Record<string, AWSStudyTopic> = {json.dumps(master_study_guide, indent=2)};

export function getStudyGuideForTask(taskId: string): AWSStudyTopic | null {{
  return AWS_STUDY_GUIDE[taskId] || null;
}}
"""

with open('frontend/src/data/awsStudyGuide.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)
print("✅ Saved frontend/src/data/awsStudyGuide.ts")

# 2. Write frontend/src/data/awsServicesData.ts
services_ts = f"""// AWS In-Scope Services Master Reference (81 Services across 14 Categories)
export interface AWSServiceItem {{
  id: string;
  serviceName: string;
  category: string;
  isImportant: boolean;
  role: string;
  plainEnglish?: string;
  diagram?: string;
  handwrittenNotes?: {{
    mnemonic: string;
    examTrap: string;
    goldenRule: string;
  }};
  bulletPoints?: string[];
  scenarioTip?: string;
  url: string;
}}

export const AWS_IN_SCOPE_SERVICES: Record<string, AWSServiceItem> = {json.dumps(all_service_profiles, indent=2)};

export const AWS_SERVICE_CATEGORIES = {json.dumps(categories, indent=2)};
"""

with open('frontend/src/data/awsServicesData.ts', 'w', encoding='utf-8') as f:
    f.write(services_ts)
print("✅ Saved frontend/src/data/awsServicesData.ts")

# 3. Retain 169 DSA Tasks and combine with 188 AWS tasks
with open('backend/data/seed_data.json', 'r', encoding='utf-8') as f:
    existing_seed = json.load(f)

dsa_tasks = [t for t in existing_seed['tasks'] if t['goalId'] == 'goal-dsa']
print(f"Retained {len(dsa_tasks)} DSA tasks.")

combined_tasks = dsa_tasks + skill_tasks + service_tasks
print(f"Total combined tasks: {len(combined_tasks)} (169 DSA + 107 Skills + 81 Services)")

new_seed = {
    "goals": existing_seed["goals"],
    "tasks": combined_tasks
}

# Update backend seed
with open('backend/data/seed_data.json', 'w', encoding='utf-8') as f:
    json.dump(new_seed, f, indent=2)
print("✅ Updated backend/data/seed_data.json")

# Update frontend seed
with open('frontend/src/data/seed_data.json', 'w', encoding='utf-8') as f:
    json.dump(new_seed, f, indent=2)
print("✅ Updated frontend/src/data/seed_data.json")

# Update backend goals_and_tasks.json
with open('backend/data/goals_and_tasks.json', 'w', encoding='utf-8') as f:
    json.dump({
        "users": [
            {
                "id": "user-default",
                "name": "Yuvanesh",
                "email": "yuvanesh@example.com",
                "passwordHash": "198e5b599630def09c8a9f8c8920fbbad0248e280c89d083b412d9d2722f8b4094eac3e9190231436491cc3476cc872fb4430cbe179d7300623f2da7f65a8714",
                "salt": "5b2322899903fece073628cd8a67d7fb",
                "createdAt": "2026-11-14T15:50:48.854Z"
            }
        ],
        "goals": existing_seed["goals"],
        "tasks": combined_tasks
    }, f, indent=2)
print("✅ Updated backend/data/goals_and_tasks.json")

# 4. Generate backend/data/init_supabase.sql
sql_lines = [
    "-- CareerPulse PostgreSQL / Supabase Schema & Comprehensive Seed File",
    f"-- Complete 107 Skills + 81 AWS Services for MLA-C02 + 169 DSA Grind Questions (Total: {len(combined_tasks)} tasks)\n",
    """CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS goals (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) DEFAULT 'Career',
  icon VARCHAR(50) DEFAULT 'Target',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tasks (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  goal_id VARCHAR(64) NOT NULL,
  title VARCHAR(255) NOT NULL,
  topic VARCHAR(100) DEFAULT 'General',
  difficulty VARCHAR(20),
  url TEXT,
  duration INT,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  completed_date VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  subtopic VARCHAR(255),
  is_important BOOLEAN DEFAULT FALSE,
  description TEXT,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_tasks_user_goal ON tasks(user_id, goal_id);
CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(user_id, completed, completed_date);

ALTER TABLE tasks ADD COLUMN IF NOT EXISTS subtopic VARCHAR(255);
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS is_important BOOLEAN DEFAULT FALSE;
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS notes TEXT;
""",
    """INSERT INTO users (id, name, email, password_hash, salt, created_at)
VALUES ('user-default', 'Yuvanesh', 'yuvanesh@example.com', '198e5b599630def09c8a9f8c8920fbbad0248e280c89d083b412d9d2722f8b4094eac3e9190231436491cc3476cc872fb4430cbe179d7300623f2da7f65a8714', '5b2322899903fece073628cd8a67d7fb', NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO goals (id, user_id, title, description, category, icon, created_at)
VALUES 
  ('goal-dsa', 'user-default', 'Master DSA (Grind 169)', 'Complete all 169 top interview questions grouped by topic from Tech Interview Handbook', 'Algorithms & Data Structures', 'Code2', NOW()),
  ('goal-aws', 'user-default', 'AWS Certified Machine Learning Engineer - Associate (MLA-C02)', 'Comprehensive 1000/1000 study roadmap covering 107 Exam Skills and 81 In-Scope AWS Services.', 'Cloud & Machine Learning', 'BrainCircuit', NOW())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, category = EXCLUDED.category, icon = EXCLUDED.icon;
"""
]

def esc(val):
    if val is None:
        return "NULL"
    if isinstance(val, bool):
        return "TRUE" if val else "FALSE"
    if isinstance(val, (int, float)):
        return str(val)
    s = str(val).replace("'", "''")
    return f"'{s}'"

chunk_size = 25
for i in range(0, len(combined_tasks), chunk_size):
    chunk = combined_tasks[i:i+chunk_size]
    row_strs = []
    for t in chunk:
        row_strs.append(f"({esc(t['id'])}, {esc(t.get('userId', 'user-default'))}, {esc(t['goalId'])}, {esc(t['title'])}, {esc(t['topic'])}, {esc(t.get('difficulty'))}, {esc(t.get('url'))}, {esc(t.get('duration'))}, {esc(t.get('completed', False))}, {esc(t.get('completedAt'))}, {esc(t.get('completedDate'))}, {esc(t.get('createdAt', 'NOW()'))}, {esc(t.get('subtopic'))}, {esc(t.get('isImportant', False))}, {esc(t.get('description'))}, {esc(t.get('notes'))})")
    
    sql_lines.append(f"""INSERT INTO tasks (id, user_id, goal_id, title, topic, difficulty, url, duration, completed, completed_at, completed_date, created_at, subtopic, is_important, description, notes)
VALUES {', '.join(row_strs)}
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  topic = EXCLUDED.topic,
  difficulty = EXCLUDED.difficulty,
  url = EXCLUDED.url,
  duration = EXCLUDED.duration,
  subtopic = EXCLUDED.subtopic,
  is_important = EXCLUDED.is_important,
  description = EXCLUDED.description,
  notes = EXCLUDED.notes;""")

with open('backend/data/init_supabase.sql', 'w', encoding='utf-8') as f:
    f.write('\n\n'.join(sql_lines))

print(f"✅ Generated backend/data/init_supabase.sql with {len(combined_tasks)} tasks.")
print("🎉 Master Deep Study Guide Generation Complete!")
