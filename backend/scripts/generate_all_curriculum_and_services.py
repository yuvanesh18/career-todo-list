# backend/scripts/generate_all_curriculum_and_services.py
import json
import os
import re

print("Starting generation of 107 Skills + 81 In-Scope AWS Services Curriculum...")

import pypdf

reader = pypdf.PdfReader(r'c:\Users\Admin\Downloads\machine-learning-engineer-associate-02.pdf')
pdf_text = '\n'.join([p.extract_text() for p in reader.pages])

# 1. Load the 107 skills
skill_pattern = r'• Skill (\d\.\d\.\d+):\s*(.*?)(?=(• Skill|\nTask|\nContent Domain|\nMentions of AWS|\Z))'
skill_matches = re.findall(skill_pattern, pdf_text, re.DOTALL)
raw_skill_lines = [(m[0], ' '.join(m[1].split())) for m in skill_matches]

# 2. Load the 81 in-scope services
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
raw_services = []
for line in raw_services_text.split('\n'):
    line_s = line.strip().replace('ﬁ', 'fi').replace('ﬂ', 'fl')
    for cat in categories:
        if line_s == cat:
            current_cat = cat
            break
    if line_s.startswith('•') and current_cat:
        svc = line_s[1:].strip()
        if 'In-scope' not in svc and 'AWS Certi' not in svc and svc not in categories:
            if svc == 'Amazon Quick': svc = 'Amazon QuickSight'
            raw_services.append((current_cat, svc))

print(f"Loaded {len(raw_skill_lines)} skills and {len(raw_services)} services.")

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

# Specific curated data for key services
def build_service_data(cat, svc_name):
    slug = get_service_slug(svc_name)
    s_id = f"svc-{slug}"
    is_hy = svc_name in HIGH_YIELD_SERVICES

    # Dedicated detailed profiles for high-yield services
    if svc_name == 'Amazon SageMaker AI':
        role = "Primary end-to-end ML platform: studio, script mode training, real-time/serverless/async endpoints, pipelines, and model monitor."
        plain = "SageMaker is AWS's complete powerhouse for building, training, tuning, deploying, and monitoring machine learning models. Instead of managing your own GPU drivers and servers, SageMaker handles everything from interactive JupyterLab notebooks to distributed cluster training and auto-scaling production endpoints."
        diag = "  [ S3 Training Data ] ──> [ SageMaker Training Cluster ] ──> [ S3 Model Artifacts ]\n                                      │                                      │\n                                      ▼                                      ▼\n                              [ Model Registry ] ─────────────────> [ SageMaker Endpoint ]"
        mnemonic = "SageMaker = The all-in-one AWS factory for Machine Learning."
        trap = "Thinking SageMaker requires you to rewrite all code in proprietary libraries. Script Mode lets you run raw PyTorch, TensorFlow, or Scikit-learn with zero changes."
        golden = "Use SageMaker for custom classical ML, distributed training, and managed multi-model endpoints."
        bullets = [
            "Script Mode runs user Python scripts inside pre-built AWS Deep Learning Containers.",
            "Model Monitor detects data drift, concept drift, bias drift, and feature attribution drift in production.",
            "Supports 4 inference types: Real-Time (<6MB/60s), Serverless, Asynchronous (1GB/1hr), and Batch Transform.",
            "Feature Store provides sub-10ms online reads and historical offline S3 time-travel queries."
        ]
        scenario = "Scenario asks for managed model training on PyTorch with automated hyperparameter optimization: Choose SageMaker Automatic Model Tuning (AMT) with PyTorch Estimator."

    elif svc_name == 'Amazon Bedrock':
        role = "Fully managed serverless Generative AI service offering high-performance Foundation Models (Claude, Titan, Llama, Mistral) via a single unified API."
        plain = "Amazon Bedrock is the easiest way to build Generative AI applications without managing a single GPU. It gives you a single API to access top foundation models from Anthropic (Claude), Meta (Llama), Amazon (Titan), and Cohere, plus built-in Knowledge Bases for RAG and Agents for taking autonomous actions."
        diag = "  [ Client App ] ──(InvokeModel API)──> ┌──────────────────────────────────────┐\n                                        │ Amazon Bedrock                       │\n                                        │ • Anthropic Claude 3.5 (Reasoning)   │\n                                        │ • Amazon Titan (Embeddings/Text)     │\n                                        │ • Knowledge Bases (Managed RAG)      │\n                                        │ • Guardrails (PII & Prompt Defense)  │\n                                        └──────────────────────────────────────┘"
        mnemonic = "Bedrock = Serverless Generative AI API gateway with zero GPU headaches."
        trap = "Launching EC2 GPU instances to run open-source Llama or Mistral when Bedrock offers them fully serverless with built-in autoscaling and security."
        golden = "For Generative AI and Foundation Models, Amazon Bedrock is the first-choice AWS service."
        bullets = [
            "Serverless on-demand pricing charges per 1,000 input and output tokens.",
            "Provisioned Throughput guarantees consistent transaction-per-second (TPS) capacity via 1-month or 6-month commitments.",
            "Knowledge Bases automatically chunk, embed, and store documents in vector databases for RAG.",
            "Guardrails enforce PII masking, toxic content filtration, and prompt injection defense."
        ]
        scenario = "A company wants to add enterprise chat over internal PDF policies with zero server management: Choose Amazon Bedrock Knowledge Bases with Anthropic Claude."

    elif svc_name == 'Amazon S3':
        role = "Object storage foundation for ML data lakes, model artifacts, checkpointing, and feature store offline storage."
        plain = "Amazon S3 is the bedrock of all AWS ML architectures. It stores raw training data, holds final model tarballs, saves training checkpoints for Spot instances, and hosts your offline feature store."
        diag = "  [ Raw Inputs ] ──> Amazon S3 ──(Pipe Mode / Fast File)──> [ SageMaker Training ]\n                          │\n                          ▼\n              S3 Lifecycle Policies (Standard -> Intelligent-Tiering -> Glacier)"
        mnemonic = "S3 = Unlimited object storage lake; S3 Fast File = Streaming without full download."
        trap = "Downloading entire 100 GB datasets to EC2 disks before training starts. Use SageMaker Fast File Mode to stream on the fly from S3."
        golden = "Use S3 Intelligent-Tiering for ML datasets with unknown or changing access frequencies."
        bullets = [
            "Supports SSE-S3 and SSE-KMS encryption at rest; enforce TLS via `aws:SecureTransport` bucket policy condition.",
            "S3 Event Notifications trigger Lambda or EventBridge when new training datasets land.",
            "Fast File mode streams S3 files into SageMaker containers without pre-allocating large EBS volumes."
        ]
        scenario = "Image classification model needs to access petabytes of images without pre-download delay: Use SageMaker Fast File Mode or Amazon FSx for Lustre linked to S3."

    elif svc_name == 'AWS Glue':
        role = "Serverless data integration and ETL service: Data Catalog, schema inference crawlers, and Spark jobs."
        plain = "AWS Glue runs Apache Spark jobs without you needing to manage Hadoop or EC2 clusters. Its crawlers scan S3, discover schemas, and populate the Glue Data Catalog so Athena and SageMaker can query files like database tables."
        diag = "  [ S3 Raw Data ] ──> [ AWS Glue Crawler ] ──> [ Glue Data Catalog ] <── [ Amazon Athena ]\n                             │\n                             ▼\n                     [ Glue Spark ETL ] ──(Convert to Parquet)──> [ Clean S3 Lake ]"
        mnemonic = "Glue = Serverless Spark ETL + Data Catalog glue that connects everything."
        trap = "Spinning up an Amazon EMR cluster for scheduled hourly ETL. Glue is serverless and costs nothing when idle."
        golden = "Choose AWS Glue for serverless ETL and schema discovery over S3 data lakes."
        bullets = [
            "Glue DynamicFrames provide schema flexibility, handling mixed types in JSON automatically.",
            "Glue DataBrew provides 250+ pre-built transformations for visual data preparation.",
            "Glue Data Quality defines rules to validate row counts, nullness, and data ranges automatically."
        ]
        scenario = "Scheduled batch pipeline must convert raw JSON logs in S3 into partitioned Parquet files with zero cluster management: Choose AWS Glue ETL job."

    elif svc_name == 'Amazon Kinesis':
        role = "Real-time streaming ingestion: Kinesis Data Streams (sub-second records), Firehose (buffer and load to S3), and Flink (streaming SQL)."
        plain = "Amazon Kinesis captures continuous live data feeds—like user clickstreams, IoT telemetry, or financial transactions—and delivers them immediately to downstream ML inference models or storage lakes."
        diag = "  [ Real-Time Events ] ──> [ Kinesis Data Streams ] ──> [ Lambda / Real-Time Model ]\n                                    │\n                                    ▼\n                           [ Kinesis Firehose ] ──(Parquet)──> [ Amazon S3 ]"
        mnemonic = "Streams = Sub-second real-time; Firehose = Auto-loader to S3/OpenSearch; Flink = Live SQL."
        trap = "Choosing Firehose when sub-second real-time latency is required. Firehose buffers for at least 60 seconds or 1 MB!"
        golden = "If latency must be < 200 ms, use Kinesis Data Streams; if loading to S3/OpenSearch without code, use Firehose."
        bullets = [
            "Kinesis Streams scales by shards: 1 shard = 1,000 records/sec or 1 MB/sec write, 2 MB/sec read.",
            "Firehose can automatically convert JSON to Parquet or ORC on the fly before storing in S3.",
            "Kinesis Video Streams ingests and encrypts live video feeds for Rekognition Video."
        ]
        scenario = "Need to stream live user behavior data to S3 formatted as Parquet with minimum operational effort: Choose Amazon Data Firehose."

    elif svc_name == 'Amazon OpenSearch Service':
        role = "Search and analytics suite providing scalable vector database capabilities for Bedrock Knowledge Bases and RAG."
        plain = "OpenSearch Service (especially OpenSearch Serverless) indexes millions of high-dimensional vector embeddings and performs sub-second approximate nearest neighbor (ANN) similarity search using HNSW algorithms."
        diag = "  [ Document Chunks ] ──> [ Titan Embeddings ] ──> [ OpenSearch Serverless Vector Index ]\n                                                                ▲\n                                                                │ Cosine Similarity Search\n                                                    [ User Query Vector ]"
        mnemonic = "OpenSearch = High-speed vector database for RAG + full-text keyword search."
        trap = "Storing vectors in raw S3 and expecting fast similarity search. S3 cannot perform k-NN search; OpenSearch or pgvector is required."
        golden = "Amazon Bedrock Knowledge Bases natively provisions and manages OpenSearch Serverless vector collections."
        bullets = [
            "Supports k-NN plugin with HNSW and IVF indexing algorithms.",
            "OpenSearch Serverless automatically scales compute capacity (OCUs) up and down based on search volume.",
            "Hybrid search combines traditional BM25 keyword matching with vector semantic search for superior retrieval accuracy."
        ]
        scenario = "Enterprise needs a managed vector database for a Bedrock Knowledge Base that scales automatically without managing clusters: Choose Amazon OpenSearch Serverless vector collection."

    elif svc_name == 'Amazon EC2':
        role = "Elastic compute instances providing accelerated GPU (G5, P4de) and custom AWS silicon (Trainium Trn1, Inferentia Inf2) for deep learning."
        plain = "Amazon EC2 gives you raw virtual machines in the cloud. For ML engineers, EC2 provides specialized GPU instances (NVIDIA A100/H100) and AWS Trainium/Inferentia chips when custom low-level cluster control is required."
        diag = "  ┌────────────────────────────────────────────────────────┐\n  │ Amazon EC2 Instance Families for Machine Learning     │\n  │ • G5 / G6  : NVIDIA A10G/L4 GPUs (General Training/Inf)│\n  │ • P4d / P5 : NVIDIA A100/H100 GPUs (Massive LLM Train) │\n  │ • Trn1     : AWS Trainium (50% cheaper LLM Training)   │\n  │ • Inf2     : AWS Inferentia2 (Lowest cost LLM Inference)│\n  └────────────────────────────────────────────────────────┘"
        mnemonic = "Trn1 = Train on AWS silicon; Inf2 = Inference on AWS silicon; P4/P5 = Extreme NVIDIA power."
        trap = "Using P-series instances for simple inference. P-series are expensive training workhorses; use Inf2 or G-series for inference."
        golden = "Use Inf2 for lowest-cost LLM inference and Trn1 for high-efficiency distributed model training."
        bullets = [
            "Spot Instances offer up to 90% discount for fault-tolerant training jobs with checkpointing.",
            "Elastic Fabric Adapter (EFA) provides OS-bypass networking for low-latency multi-node GPU communication.",
            "AWS Graviton instances provide high-efficiency CPU inference for lightweight classical models."
        ]
        scenario = "Cost-sensitive team needs to run real-time inference for a 13B LLM: Choose Amazon EC2 Inf2 instances or SageMaker endpoints backed by Inf2."

    elif svc_name == 'AWS KMS':
        role = "Cryptographic service for managing encryption keys (CMKs) across S3 data, EBS volumes, ECR images, and SageMaker models."
        plain = "AWS Key Management Service (KMS) protects all your ML data at rest. You create Customer Managed Keys (CMKs) that give you full control over key rotation and IAM access policies."
        diag = "  [ Data Ingestion / S3 ] ──(KMS CMK Encrypt)──> [ S3 Encrypted at Rest ]\n                                                       │\n                                                       ▼\n  [ SageMaker Training Job ] <──(kms:Decrypt via Role)─┘"
        mnemonic = "KMS = The master keyholder for data encryption across all ML pipelines."
        trap = "Forgetting to grant `kms:Decrypt` permission to the SageMaker execution role. If the S3 bucket is encrypted with a KMS CMK, the role will fail with Access Denied!"
        golden = "SageMaker execution roles need explicit `kms:Decrypt` and `kms:GenerateDataKey` permissions for CMK-encrypted buckets."
        bullets = [
            "Envelope encryption protects data with data keys, which are encrypted under root KMS CMKs.",
            "Inter-container traffic encryption can be enabled on SageMaker Estimators with `EnableInterContainerTrafficEncryption=True`.",
            "KMS key policies determine which AWS roles and accounts are permitted to use the key."
        ]
        scenario = "SageMaker training job fails to read S3 data despite having `s3:GetObject` permission: Check if S3 bucket uses a KMS CMK and ensure the role has `kms:Decrypt` permission."

    elif svc_name == 'Amazon VPC':
        role = "Isolated private network infrastructure: private subnets, security groups, and VPC Endpoints (AWS PrivateLink) for secure ML workloads."
        plain = "Amazon Virtual Private Cloud (VPC) lets you run SageMaker notebooks, training clusters, and inference endpoints inside an isolated private network without exposing traffic to the public internet."
        diag = "  ┌──────────────────────────────────────────────────────────────┐\n  │ Corporate Private VPC (No Internet Gateway)                  │\n  │                                                              │\n  │  [ SageMaker Studio / Endpoints ]                            │\n  │            │                                                 │\n  │            ▼                                                 │\n  │  [ VPC Interface Endpoint (PrivateLink) ] ──> S3 / KMS APIs  │\n  └──────────────────────────────────────────────────────────────┘"
        mnemonic = "VPC = Private security fence around your models and data."
        trap = "Routing training data over public internet IPs. Use VPC Interface Endpoints and S3 Gateway Endpoints for direct, private data transfers."
        golden = "Deploy SageMaker resources in private subnets with VPC endpoints and enable `EnableNetworkIsolation=True`."
        bullets = [
            "Gateway VPC Endpoints provide free, private connectivity to Amazon S3 and DynamoDB.",
            "Interface VPC Endpoints (PrivateLink) provide private connectivity to SageMaker API, SageMaker Runtime, and Bedrock.",
            "Security Groups act as virtual firewalls controlling inbound and outbound instance traffic."
        ]
        scenario = "Security requirement specifies that ML training data must never traverse the public internet: Deploy SageMaker in a private subnet with an S3 VPC Gateway Endpoint."

    else:
        # High quality generated profile for all other in-scope services
        role = f"In-scope {cat} service supporting ML and AI workloads on the MLA-C02 exam."
        plain = f"{svc_name} is a key AWS service in the {cat} category. In the MLA-C02 exam, understanding how {svc_name} integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture."
        diag = f"  [ Upstream ML Pipeline ] ──> [ {svc_name} ({cat}) ] ──> [ Downstream Monitoring / Audit ]"
        mnemonic = f"{svc_name}: Master its role in the {cat} domain."
        trap = f"Confusing {svc_name} with other {cat} services in multiple-choice questions."
        golden = f"Understand when {svc_name} is preferred over alternative services for {cat} workloads."
        bullets = [
            f"Category: {cat}.",
            f"Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
            "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
            "Best practice: Enforce least privilege access and CloudWatch monitoring."
        ]
        scenario = f"Exam scenario involving {svc_name}: Choose the option that leverages AWS native integration and minimizes management overhead."

    doc_url = f"https://docs.aws.amazon.com/{slug.replace('-', '')}/latest/userguide/what-is.html"
    if 'sagemaker' in slug:
        doc_url = "https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html"
    elif 'bedrock' in slug:
        doc_url = "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html"
    elif 's3' in slug:
        doc_url = "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"

    return {
        "id": s_id,
        "serviceName": svc_name,
        "category": cat,
        "isImportant": is_hy,
        "role": role,
        "plainEnglish": plain,
        "diagram": diag,
        "handwrittenNotes": {
            "mnemonic": mnemonic,
            "examTrap": trap,
            "goldenRule": golden
        },
        "bulletPoints": bullets,
        "scenarioTip": scenario,
        "url": doc_url
    }

# Generate 81 Service Profiles and Tasks
all_service_profiles = {}
service_tasks = []

for cat, svc in raw_services:
    s_data = build_service_data(cat, svc)
    all_service_profiles[s_data["id"]] = s_data

    service_tasks.append({
        "id": s_data["id"],
        "userId": "user-default",
        "goalId": "goal-aws",
        "title": f"{s_data['serviceName']}",
        "topic": f"AWS Services: {cat}",
        "subtopic": cat,
        "difficulty": "Hard" if s_data["isImportant"] else "Medium",
        "url": s_data["url"],
        "duration": 20 if s_data["isImportant"] else 15,
        "completed": False,
        "completedAt": None,
        "completedDate": None,
        "createdAt": "2026-11-14T15:00:00.000Z",
        "isImportant": s_data["isImportant"],
        "description": s_data["plainEnglish"],
        "notes": f"Role: {s_data['role']} Exam Tip: {s_data['handwrittenNotes']['goldenRule']} Gotcha: {s_data['handwrittenNotes']['examTrap']}"
    })

print(f"Generated {len(service_tasks)} service tasks.")

# Load existing 107 skills from awsStudyGuide.ts
with open('frontend/src/data/awsStudyGuide.ts', 'r', encoding='utf-8') as f:
    guide_text = f.read()

m = re.search(r'export const AWS_STUDY_GUIDE: Record<string, AWSStudyTopic> = (\{.*?\});', guide_text, re.DOTALL)
skill_topics = json.loads(m.group(1)) if m else {}

# Load existing 107 skill tasks from backend seed_data.json
with open('backend/data/seed_data.json', 'r', encoding='utf-8') as f:
    existing_raw_seed = json.load(f)
skill_tasks = [t for t in existing_raw_seed['tasks'] if t['id'].startswith('mla-')]

print(f"Loaded {len(skill_topics)} skill topics and {len(skill_tasks)} skill tasks.")

# Merge both into master study guide
master_study_guide = {}
master_study_guide.update(skill_topics)

for s_id, s_data in all_service_profiles.items():
    master_study_guide[s_id] = {
        "id": s_data["id"],
        "skillNumber": "SVC",
        "title": f"AWS Service: {s_data['serviceName']}",
        "domain": f"AWS In-Scope Service ({s_data['category']})",
        "subtopic": s_data["category"],
        "difficulty": "Hard" if s_data["isImportant"] else "Medium",
        "isImportant": s_data["isImportant"],
        "url": s_data["url"],
        "plainEnglish": s_data["plainEnglish"],
        "diagram": s_data["diagram"],
        "handwrittenNotes": s_data["handwrittenNotes"],
        "bulletPoints": s_data["bulletPoints"],
        "scenarioTip": s_data["scenarioTip"]
    }

print(f"Master Study Guide has {len(master_study_guide)} total topics (107 skills + 81 services).")

# Write frontend/src/data/awsStudyGuide.ts
ts_content = f"""// AWS MLA-C02 Master Study Guide & Interactive Notepad Data
// Auto-generated complete reference for all 107 official exam skills + 81 in-scope AWS services

export interface HandwrittenNotes {{
  mnemonic: string;
  examTrap: string;
  goldenRule: string;
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
  plainEnglish: string;
  diagram: string;
  handwrittenNotes: HandwrittenNotes;
  bulletPoints: string[];
  scenarioTip: string;
}}

export const AWS_STUDY_GUIDE: Record<string, AWSStudyTopic> = {json.dumps(master_study_guide, indent=2)};

export function getStudyGuideForTask(taskId: string): AWSStudyTopic | null {{
  return AWS_STUDY_GUIDE[taskId] || null;
}}
"""

with open('frontend/src/data/awsStudyGuide.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)
print("✅ Updated frontend/src/data/awsStudyGuide.ts")

# Write frontend/src/data/awsServicesData.ts
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

# Load existing seed for DSA
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

# Update backend/data/seed_data.json
with open('backend/data/seed_data.json', 'w', encoding='utf-8') as f:
    json.dump(new_seed, f, indent=2)
print("✅ Updated backend/data/seed_data.json")

# Update frontend/src/data/seed_data.json
with open('frontend/src/data/seed_data.json', 'w', encoding='utf-8') as f:
    json.dump(new_seed, f, indent=2)
print("✅ Updated frontend/src/data/seed_data.json")

# Update backend/data/goals_and_tasks.json
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

# Update init_supabase.sql
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
