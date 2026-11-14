# backend/scripts/generate_deep_study_guide.py
"""
Master Deep Educational Study Guide & Comprehensive Seed Generator for AWS MLA-C02
Covers all 107 Official Exam Skills from the Guide PDF + 81 In-Scope AWS Services.
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
        'analogy': 'An oil refinery: crude petroleum (unstructured raw logs, images, text) passes through cracking towers and chemical catalysts (AWS Glue PySpark, SageMaker Data Wrangler, Tokenizers) to yield high-octane rocket fuel (curated Parquet vectors and normalized feature stores).',
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
        'trap': 'Selecting complex deep learning LLMs for simple tabular customer churn classification. XGBoost on SageMaker is vastly faster, cheaper, and more accurate for tabular structured data.',
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
        'trap': 'Triggering production deployment without an approved model status in SageMaker Model Registry. The exam requires Model Registry approval status transitions (Approved) to emit EventBridge events that trigger CI/CD deployment pipelines.',
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
        'trap': 'Enabling Managed Spot Training without configuring an S3 checkpoint directory (checkpoint_s3_uri). If a Spot instance is reclaimed by AWS, training progress is completely lost without checkpointing!',
        'golden': 'Always configure checkpoint_s3_uri and checkpoint_local_path when enabling use_spot_instances=True in SageMaker to achieve up to 90% cost savings with zero progress loss.',
        'diagram_type': 'COST'
    },
    '4.3': {
        'focus': 'Workload Security, Compliance, KMS & Guardrails',
        'analogy': 'A maximum-security biometric treasury vault: all transfers travel through armored underground tunnels without touching public roads (VPC Interface Endpoints / PrivateLink), double-locked with cryptographic keys (KMS CMK), while biometric security guards (Bedrock Guardrails) inspect and redact all communications.',
        'key_services': 'Amazon Bedrock Guardrails, AWS KMS (Customer Managed Keys), Amazon VPC PrivateLink, AWS IAM Least Privilege, SageMaker Network Isolation, Amazon Macie',
        'trap': 'Routing SageMaker training or inference traffic across the public internet when sensitive HIPAA/financial data is involved. The exam demands VPC Interface Endpoints (PrivateLink) with EnableNetworkIsolation=True.',
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
            f"  • Payload & Response Capture enabled (DataCaptureConfig)\n"
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

# Detailed Knowledge Bank for Topics & Skills
def build_deep_topic_knowledge(s_num, s_desc, task_num, domain_num):
    clean = ' '.join(s_desc.split()).strip()
    c_lower = clean.lower()
    intel = TASK_INTEL.get(task_num, TASK_INTEL['1.1'])

    # Multi-paragraph in-depth technical explanation
    # 1. Architectural Foundations
    # 2. AWS Service Implementations & Decisions
    # 3. Engineering Mechanics & Operational Best Practices
    # 4. Exam-Specific Revision Highlights
    
    p1 = (
        f"Skill {s_num} focuses on: '{clean}'. In modern enterprise machine learning and generative AI architectures, "
        f"this topic forms the backbone of {TASKS[task_num]} under {DOMAINS[domain_num]}. "
        f"Rather than treating this as an isolated task, AWS assesses your end-to-end understanding of how data flows, "
        f"how distributed compute is orchestrated, and how high availability, fault tolerance, and security compliance are enforced."
    )

    # Contextual deep dive based on domain and task keywords
    if 'storage' in c_lower or 's3' in c_lower or 'ebs' in c_lower or 'efs' in c_lower or 'fsx' in c_lower:
        p2 = (
            "From an architectural standpoint, AWS provides distinct storage tiers optimized for specific ML access patterns. "
            "Amazon S3 serves as the durable, virtually limitless object storage lake, offering storage tiers from S3 Standard "
            "(for active pipelines) to S3 Intelligent-Tiering and S3 Glacier (for long-term retention and compliance). "
            "For compute workloads, Amazon EBS provides ultra-low latency block volumes attached to single EC2/training nodes, "
            "Amazon EFS provides a scalable multi-AZ shared POSIX file system, and Amazon FSx for Lustre delivers parallel high-throughput "
            "scratch storage with hundreds of GB/s and sub-millisecond latencies, linking directly to S3 buckets to hydrate multi-GPU training clusters."
        )
        p3 = (
            "When designing ingestion pipelines, ML engineers must account for throughput limits and pricing structures. "
            "For example, S3 supports 3,500 PUT/POST/DELETE and 5,500 GET/HEAD requests per second per prefix. Partitioning prefixes "
            "(e.g., date-based or hash-based paths) prevents throttling. For training large deep learning or foundation models, "
            "streaming data directly from S3 using Pipe Mode or caching through FSx for Lustre eliminates local disk saturation and "
            "accelerates time-to-first-epoch."
        )
        key_points = [
            "S3 Standard / Intelligent-Tiering: Primary centralized data lake storage with 99.999999999% (11 9s) durability.",
            "FSx for Lustre: The gold standard for distributed multi-GPU training clusters; caches S3 objects with POSIX compatibility at >100 GB/s.",
            "Amazon EFS: Multi-AZ shared file system for home directories, notebooks, and shared script repositories.",
            "S3 Request Limits: 3,500 PUT/POST/DELETE and 5,500 GET/HEAD per second per prefix; scale out with partitioned prefixes."
        ]
    elif 'stream' in c_lower or 'kinesis' in c_lower or 'kafka' in c_lower or 'flink' in c_lower:
        p2 = (
            "Streaming ingestion architectures on AWS are designed to process continuous, high-velocity event data with zero data loss. "
            "Amazon Kinesis Data Streams provides ordered, partitioned sharded streams capable of ingesting 1MB/sec (or 1,000 records/sec) write "
            "and 2MB/sec read per shard in Provisioned mode, or automatic scaling in On-Demand mode. "
            "Amazon Data Firehose (formerly Kinesis Data Firehose) is the fully managed serverless delivery engine that automatically batches, "
            "compresses (GZIP, Snappy), and transforms streaming data before landing it into Amazon S3, Amazon Redshift, or Amazon OpenSearch."
        )
        p3 = (
            "For complex real-time analytics, Amazon Managed Service for Apache Flink runs stateful stream processing with sliding, tumbling, "
            "and session windows over streaming records. For organizations committed to open-source ecosystems, Amazon MSK (Managed Streaming for Apache Kafka) "
            "delivers fully managed Kafka clusters. Real-time inference pipelines frequently connect Kinesis streams to AWS Lambda or SageMaker endpoints "
            "for sub-second anomaly detection and feature extraction."
        )
        key_points = [
            "Kinesis Data Streams: Real-time custom event streaming; each shard provides 1MB/s write and 2MB/s read throughput.",
            "Amazon Data Firehose: Zero-code serverless loading into S3/OpenSearch; configurable buffering (60-900 seconds or 1-128 MB).",
            "Apache Flink: Stateful stream processing with sliding and tumbling windows for real-time feature derivation.",
            "Partition Keys: Ensure even distribution across shards to prevent 'hot shard' throttling exceptions."
        ]
    elif 'vector' in c_lower or 'opensearch' in c_lower or 'pgvector' in c_lower or 'rag' in c_lower:
        p2 = (
            "Vector databases form the retrieval backbone for Retrieval Augmented Generation (RAG) and semantic similarity search. "
            "Amazon OpenSearch Serverless Vector Engine provides a managed, serverless k-NN (k-nearest neighbors) vector store supporting "
            "Hierarchical Navigable Small World (HNSW) and Inverted File (IVF) graph indexing algorithms. "
            "Alternatively, Amazon Aurora and RDS PostgreSQL with the pgvector extension allow teams to co-locate vector embeddings "
            "alongside relational enterprise transactional data."
        )
        p3 = (
            "In a production RAG system, text documents are chunked (using fixed, hierarchical, or semantic chunking), processed through an embedding "
            "model (such as Amazon Titan Text Embeddings V2), and indexed with rich metadata (document ID, timestamp, department). "
            "During retrieval, the query vector is compared using distance metrics: Cosine Similarity (angle-based, normalized), Euclidean (L2) distance, "
            "or Dot Product, followed by optional reranking (e.g., Cohere Rerank on Amazon Bedrock) to maximize contextual relevance."
        )
        key_points = [
            "OpenSearch Serverless Vector Engine: Dedicated serverless vector store for high-throughput semantic search and Bedrock Knowledge Bases.",
            "RDS / Aurora with pgvector: Cost-effective vector search for relational applications without managing an independent search cluster.",
            "Distance Metrics: Cosine similarity for direction/angle; Euclidean distance for absolute spatial distance; Dot product for unnormalized vectors.",
            "RAG Chunking: Balance chunk size (e.g., 512 tokens with 10% overlap) to retain contextual integrity without exceeding LLM context windows."
        ]
    elif 'feature store' in c_lower:
        p2 = (
            "Amazon SageMaker Feature Store is a purpose-built repository designed to create, share, and manage standardized ML features "
            "across training and inference workloads, solving the notorious 'train-serve skew' problem. It implements a Dual Store Architecture: "
            "an Online Store backed by Amazon DynamoDB for ultra-low latency (<10ms) single-record retrieval during real-time inference, "
            "and an Offline Store backed by Amazon S3 in Apache Parquet format for batch training and point-in-time historical queries."
        )
        p3 = (
            "Each Feature Group is defined by a schema with a unique RecordIdentifier and an EventTime. "
            "The EventTime ensures point-in-time correctness: when training models on past historical data, engineers can query the exact feature "
            "values that existed at the exact timestamp of the historical event, completely preventing future data leakage into training sets."
        )
        key_points = [
            "Dual Store: Online Store (DynamoDB backed, <10ms latency for inference); Offline Store (S3 Parquet for batch training).",
            "Point-in-Time Correctness: Uses EventTime to execute time-travel queries, preventing data leakage during model training.",
            "Train-Serve Skew: Solved by sharing identical feature transformation definitions between training and production inference.",
            "Integration: Ingests directly from SageMaker Data Wrangler, AWS Glue, EMR, or streaming via Boto3 PutRecord API."
        ]
    elif 'bias' in c_lower or 'clarify' in c_lower or 'fairness' in c_lower or 'quality' in c_lower:
        p2 = (
            "Data quality and fairness auditing are critical requirements for production-ready, responsible ML systems on AWS. "
            "Amazon SageMaker Clarify detects potential bias at all stages of the ML lifecycle. "
            "Pre-training bias metrics evaluate raw training datasets before model training occurs, measuring statistical imbalances across sensitive "
            "facet attributes (such as gender, age, or postal code). Key pre-training metrics include Class Imbalance (CI) and Difference in "
            "Positive Proportions in Labels (DPL)."
        )
        p3 = (
            "Post-training bias metrics evaluate model predictions against validation datasets, calculating Disparate Impact (DI), "
            "Difference in Conditional Acceptance (DCA), and Treatment Equality (TE). For general data quality, AWS Glue Data Quality uses "
            "Data Quality Definition Language (DQDL) declarative rules (e.g., Completeness, IsPrimaryKey, ColumnValues) to enforce strict schema "
            "and statistical constraints directly inside data pipelines, halting corrupted batches before model ingestion."
        )
        key_points = [
            "Pre-Training Bias: Class Imbalance (CI) measures sample size disparity; DPL measures positive outcome disparity in raw labels.",
            "Post-Training Bias: Evaluates model predictions; Disparate Impact (DI) checks if acceptance ratio differs across protected groups.",
            "AWS Glue Data Quality: Enforces DQDL declarative rules in ETL pipelines to catch anomalies, nulls, and schema violations.",
            "Explainability: SageMaker Clarify uses KernelSHAP to generate Shapley values for local and global feature attribution."
        ]
    elif 'bedrock' in c_lower or 'foundation model' in c_lower or 'fm' in c_lower or 'prompt' in c_lower or 'llm' in c_lower:
        p2 = (
            "Amazon Bedrock is the premier serverless AWS service for building generative AI applications using leading Foundation Models (FMs). "
            "It provides managed access to high-performance models from Anthropic (Claude 3.5 Sonnet, Claude 3 Haiku), Amazon (Titan Text, Titan Image, "
            "Titan Embeddings), Meta (Llama 3), Mistral AI, and AI21 Labs through a unified, secure API. "
            "Because Bedrock is completely serverless, you do not manage GPU infrastructure, clusters, or operating system patches."
        )
        p3 = (
            "Enterprise customization on Bedrock spans three primary tiers: Prompt Engineering / Few-Shot prompting (zero compute cost, runtime context), "
            "Retrieval Augmented Generation (RAG) via Bedrock Knowledge Bases (connecting models to dynamic enterprise data in S3 and vector stores), "
            "and Fine-Tuning / Continuous Pre-training (customizing model weights using prompt-response pairs in JSONL format). "
            "For governance, Amazon Bedrock Guardrails applies configurable filters for PII redaction, toxic speech, denied topics, and hallucination grounding checks."
        )
        key_points = [
            "Foundation Model Selection: Claude 3.5 Sonnet for complex reasoning/vision; Claude 3 Haiku for ultra-low latency; Titan for cost efficiency.",
            "Serverless Architecture: Pay-as-you-go per 1,000 input/output tokens, or commit to Provisioned Throughput for sustained peak traffic.",
            "Bedrock Knowledge Bases: Turnkey managed RAG pipeline that handles chunking, vector embedding, and retrieval automatically.",
            "Bedrock Guardrails: Intercepts prompts and responses to block sensitive PII, profanity, and verify factual grounding against sources."
        ]
    elif 'distributed' in c_lower or 'training' in c_lower or 'spot' in c_lower:
        p2 = (
            "Model training on Amazon SageMaker AI is designed to scale from single-node instances to distributed multi-node GPU clusters. "
            "SageMaker Distributed Training provides two primary optimization paradigms: SageMaker Distributed Data Parallel (SMDDP) and "
            "SageMaker Distributed Model Parallel (SMDP). SMDDP replicates the model across all GPUs and splits the training dataset, "
            "using high-efficiency ring-AllReduce communication over AWS Nitro Elastic Fabric Adapter (EFA) 100Gbps networking."
        )
        p3 = (
            "When individual foundation model parameters exceed the GPU memory (VRAM) of a single node, SMDP applies tensor parallelism "
            "and pipeline parallelism, splitting model layers across multiple GPUs. "
            "To slash compute costs by up to 90%, engineers utilize SageMaker Managed Spot Training with Amazon EC2 Spot instances. "
            "A mandatory best practice is configuring checkpointing (`checkpoint_s3_uri` and `checkpoint_local_path`), enabling training jobs "
            "to automatically resume from the latest checkpoint without progress loss when Spot capacity is reclaimed."
        )
        key_points = [
            "SMDDP (Data Parallel): Replicates model on all GPUs, partitions dataset, synchronizes gradients via ring-AllReduce over EFA.",
            "SMDP (Model Parallel): Splits model layers and tensor matrices across GPUs when parameters exceed single GPU VRAM.",
            "Managed Spot Training: Up to 90% cost reduction; strictly requires S3 checkpointing to resume seamlessly after reclamation.",
            "Accelerators: EC2 P4de/P5 (NVIDIA A100/H100 GPUs) for extreme training; AWS Trainium (Trn1) for cost-optimized deep learning."
        ]
    elif 'endpoint' in c_lower or 'deploy' in c_lower or 'infer' in c_lower or 'serving' in c_lower:
        p2 = (
            "Amazon SageMaker AI provides four distinct model deployment options tailored to application latency, payload size, and traffic patterns: "
            "1. Real-Time Endpoints: Persistent, dedicated compute instances delivering steady, sub-10 millisecond latency (payload limit: 6MB, timeout: 60s). "
            "2. Serverless Endpoints: Automatically scales compute from zero based on traffic, ideal for intermittent or spiky workloads with zero idle cost. "
            "3. Asynchronous Endpoints: Ingestion queue backed by Amazon S3, processing large payloads up to 1GB with processing times up to 1 hour, "
            "sending completion notifications via Amazon SNS. "
            "4. Batch Transform: High-throughput offline batch scoring on large datasets stored in S3 without persistent endpoints."
        )
        p3 = (
            "For cost-efficient hosting of hundreds of models, Multi-Model Endpoints (MME) dynamically load models into shared memory from S3 on demand. "
            "In production, zero-downtime deployments are executed via Blue/Green traffic shifting and Canary deployments. "
            "Auto-scaling policies use Target Tracking based on the `SageMakerVariantInvocationsPerInstance` metric to automatically adjust instance counts."
        )
        key_points = [
            "Real-Time: Dedicated instances, <10ms latency, 6MB payload max, 60-second timeout; best for steady interactive apps.",
            "Serverless: Scales to 0 instances when idle; zero idle cost; occasional cold start latency.",
            "Asynchronous: Payloads up to 1GB, runtimes up to 1 hour, S3 request queue, auto-scales to zero, SNS notification on completion.",
            "Multi-Model Endpoints (MME): Hosts hundreds of models on a single shared instance cluster, slashing infrastructure costs."
        ]
    elif 'pipeline' in c_lower or 'ci/cd' in c_lower or 'registry' in c_lower or 'orchestrat' in c_lower:
        p2 = (
            "Automated MLOps and orchestration on AWS is driven by Amazon SageMaker Pipelines—a purpose-built CI/CD service for machine learning. "
            "SageMaker Pipelines represents workflows as Directed Acyclic Graphs (DAGs) composed of specialized steps: "
            "`ProcessingStep` (data pre-processing via Glue/Data Wrangler), `TrainingStep` (model fitting), `ClarifyCheckStep` (bias and quality validation), "
            "`ModelStep` (model creation), `RegisterModel` (registering packages into Model Registry), and `ConditionStep` (conditional branching based on evaluation metrics)."
        )
        p3 = (
            "The SageMaker Model Registry serves as the central audit catalog for versioned models. Models transition through approval states "
            "('PendingManualApproval', 'Approved', 'Rejected'). Approving a model emits an Amazon EventBridge event that triggers downstream "
            "AWS CodePipeline or Step Functions workflows to deploy the model artifact to Staging and Production endpoints with automated rollback."
        )
        key_points = [
            "SageMaker Pipelines: Purpose-built ML DAG workflow engine integrating data preparation, training, and model registration.",
            "SageMaker Model Registry: Central repository managing model versions, evaluation metrics, model cards, and approval states.",
            "EventBridge Integration: Status changes in Model Registry trigger automated CI/CD deployment pipelines in CodePipeline.",
            "ConditionStep: Evaluates test accuracy/F1 against production baselines; only promotes models meeting strict criteria."
        ]
    elif 'monitor' in c_lower or 'drift' in c_lower:
        p2 = (
            "Continuous model monitoring in production is essential to combat concept drift, covariate shift, and silent model decay. "
            "Amazon SageMaker Model Monitor continuously tracks deployed models in production without writing custom analysis scripts. "
            "It operates by enabling SageMaker Endpoint Data Capture, which writes a configurable percentage of live request inputs and "
            "model prediction outputs directly to an Amazon S3 capture bucket in JSONL format."
        )
        p3 = (
            "Model Monitor runs four distinct scheduled monitoring jobs: "
            "1. Data Quality Monitor: Compares incoming feature distributions against baseline statistics (detects schema changes, nulls, out-of-range values). "
            "2. Model Quality Monitor: Compares predictions against ground-truth labels collected downstream (detects drops in accuracy, F1, or ROC-AUC). "
            "3. Bias Drift Monitor: Uses Clarify to detect if fairness metrics (such as DPL or Disparate Impact) are diverging over time. "
            "4. Feature Attribution Drift Monitor: Uses KernelSHAP to detect shifts in feature importance rankings. Violations trigger Amazon CloudWatch alarms."
        )
        key_points = [
            "Data Capture: Natively captures live inference payloads and responses to Amazon S3 in JSONL format.",
            "Data Quality Monitor: Detects changes in feature distributions and schema violations against training baselines.",
            "Model Quality Monitor: Evaluates performance degradation when ground-truth labels become available.",
            "Automated Retraining: CloudWatch Alarms generated by Model Monitor trigger EventBridge to execute automated retraining pipelines."
        ]
    elif 'cost' in c_lower or 'optimiz' in c_lower:
        p2 = (
            "Cloud financial management and infrastructure optimization for ML/AI workloads on AWS requires strategic alignment between "
            "compute instance types, purchasing options, and resource utilization. "
            "AWS Compute Optimizer analyzes CloudWatch historical utilization metrics to recommend right-sizing opportunities for EC2, "
            "SageMaker endpoints, and Lambda functions, preventing over-provisioned GPU/CPU waste."
        )
        p3 = (
            "For inference workloads, AWS Inferentia (Inf2) chips deliver up to 50% better price-performance compared to comparable GPU instances, "
            "compiled using the AWS Neuron SDK. For training, AWS Trainium (Trn1) delivers up to 50% savings over standard GPU nodes. "
            "Combining SageMaker Savings Plans (committing to consistent hourly compute spend for 1 or 3 years) with Managed Spot Training "
            "and Target Tracking Auto-Scaling yields maximum cost efficiency."
        )
        key_points = [
            "AWS Compute Optimizer: Provides ML-driven right-sizing recommendations for SageMaker endpoints and EC2 instances.",
            "AWS Inferentia / Trainium: Purpose-built AI accelerators providing up to 50% lower cost per inference/training job via Neuron SDK.",
            "SageMaker Savings Plans: Discounts of up to 64% in exchange for a 1- or 3-year hourly spend commitment.",
            "Spot Training + S3 Checkpointing: Up to 90% discount on training compute with zero risk of lost progress."
        ]
    else:  # Security, IAM, KMS, Network Isolation
        p2 = (
            "Security and compliance for ML workloads on AWS demands a multi-layered defense-in-depth architecture. "
            "At the network layer, Amazon Virtual Private Cloud (VPC) subnets isolate compute resources from the public internet. "
            "Traffic between SageMaker, Bedrock, and AWS services travels strictly over AWS PrivateLink using VPC Interface Endpoints "
            "(e.g., `sagemaker.api`, `sagemaker.runtime`, `bedrock-runtime`) and Gateway Endpoints for Amazon S3."
        )
        p3 = (
            "At the data layer, encryption is enforced at rest using AWS KMS Customer Managed Keys (CMKs) with envelope encryption, "
            "and in transit using TLS 1.3. For training containers, setting `EnableNetworkIsolation=True` completely blocks external "
            "network communication from training algorithms, preventing data exfiltration. "
            "AWS IAM execution roles follow the principle of least privilege, restricting access to exact S3 bucket ARNs and KMS key IDs."
        )
        key_points = [
            "VPC Interface Endpoints (PrivateLink): Routes all API and runtime traffic over AWS private backbone without internet gateways.",
            "Network Isolation: Setting EnableNetworkIsolation=True ensures training/inference containers have no outbound internet access.",
            "AWS KMS CMKs: Enforces cryptographic control at rest across S3 buckets, EBS storage volumes, and inter-container communication.",
            "IAM Execution Roles: Granular least-privilege permissions assigned specifically to SageMaker and Bedrock services."
        ]

    # Combine into full detailed summary
    full_summary = f"{p1}\n\n{p2}\n\n{p3}"

    return {
        "summary": full_summary,
        "analogy": intel['analogy'],
        "why": f"In enterprise production environments, failure to master {clean.lower()} results in critical vulnerabilities: train-serve skew, silent accuracy decay, runaway GPU bills, or severe data compliance violations. Mastering this topic ensures high-throughput, fault-tolerant, and audit-compliant machine learning systems.",
        "key_points": key_points
    }

# Skill deep educational profile builder
def generate_skill_deep_profile(s_num, s_desc):
    task_num = s_num.rsplit('.', 1)[0]
    domain_num = s_num.split('.')[0]
    is_hy = s_num in HIGH_YIELD_SKILLS
    clean_desc = ' '.join(s_desc.split()).strip()
    
    intel = TASK_INTEL.get(task_num, TASK_INTEL['1.1'])
    topic_kb = build_deep_topic_knowledge(s_num, s_desc, task_num, domain_num)
    
    # Concrete Learning Objectives
    learn = [
        f"Master the core operational principles of '{clean_desc}'.",
        f"Understand how AWS integrates {intel['key_services'].split(',')[0]} and related services for {TASKS[task_num]}.",
        f"Learn the step-by-step technical lifecycle, data path, and runtime mechanics of this workflow.",
        f"Master the high-yield exam decision matrix, Gotchas, and traps needed to achieve 1000/1000 marks on the MLA-C02 exam."
    ]

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
        "summary": topic_kb["summary"],
        "analogy": topic_kb["analogy"],
        "why": topic_kb["why"],
        "revisionKeyPoints": topic_kb["key_points"],
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

    p1 = (
        f"{svc_name} is an official in-scope AWS service in the {cat} category for the AWS Machine Learning Engineer - Associate (MLA-C02) exam. "
        f"In enterprise cloud environments, {svc_name} provides robust, scalable, and highly available infrastructure specifically designed "
        f"to address data engineering, deep learning model training, foundation model deployment, workflow orchestration, or cloud governance."
    )
    p2 = (
        f"Within modern AWS ML/AI architectures, {svc_name} plays an essential role. It integrates seamlessly with Amazon SageMaker AI, "
        f"Amazon Bedrock, Amazon S3, and AWS IAM. Deploying {svc_name} allows machine learning engineers to eliminate the operational toil "
        f"of server provisioning, manual patching, and scaling bottlenecks while guaranteeing enterprise-grade SLAs, multi-AZ high availability, "
        f"and rigorous compliance standards (such as HIPAA, GDPR, and SOC2)."
    )
    p3 = (
        f"On the MLA-C02 exam, questions surrounding {svc_name} test your ability to make optimal architectural decisions under tight constraints. "
        f"You must know precisely when {svc_name} is the superior choice over competing AWS services, how to secure it using VPC Interface Endpoints "
        f"(PrivateLink) and AWS KMS Customer Managed Keys (CMKs), how to configure least-privilege IAM policies, and how to optimize runtime costs."
    )
    summary = f"{p1}\n\n{p2}\n\n{p3}"

    analogy = (
        f"Think of {svc_name} like a specialized high-performance workstation on a modern factory floor: "
        f"it receives inputs from upstream conveyer belts (S3, Kinesis), executes its precision operations with mathematical consistency, "
        f"and sends certified outputs downstream (SageMaker, Bedrock, CloudWatch) while maintaining a complete audit trail."
    )

    why = (
        f"Leveraging {svc_name} eliminates the substantial operational overhead, patching, and scaling risks of maintaining custom open-source tools. "
        f"It natively integrates with AWS IAM, CloudWatch, and AWS KMS, ensuring enterprise security compliance out of the box."
    )

    key_points = [
        f"Official Category: {cat} — high-priority focus on the MLA-C02 examination.",
        f"Managed Architecture: Fully managed service providing built-in multi-AZ redundancy and automatic failover.",
        "Security Baseline: Supports IAM execution roles, KMS CMK encryption at rest, and VPC PrivateLink.",
        "Operational Observability: Direct integration with Amazon CloudWatch for metrics/alarms and AWS CloudTrail for auditing."
    ]

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
        "revisionKeyPoints": key_points,
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
            "whyItMatters": p["why"],
            "revisionKeyPoints": p["revisionKeyPoints"]
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
        "description": p["summary"][:200] + "...",
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
            "whyItMatters": p["why"],
            "revisionKeyPoints": p["revisionKeyPoints"]
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
        "role": p["summary"][:140] + "...",
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
        "description": p["summary"][:200] + "...",
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
  revisionKeyPoints?: string[];
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
