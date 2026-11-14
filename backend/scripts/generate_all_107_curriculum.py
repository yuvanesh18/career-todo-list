# backend/scripts/generate_all_107_curriculum.py
import json
import os
import re

print("Building complete AWS MLA-C02 107-Skill Curriculum and Study Notepad System...")

with open('all_107_skills.txt', 'r', encoding='utf-8') as f:
    raw_lines = [l.strip().split('||') for l in f if l.strip()]

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

HIGH_YIELD = {
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

# Domain specific documentation URL templates
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

def clean_desc(desc):
    return ' '.join(desc.split()).strip()

# Specialized content map for deep, accurate study material per skill
def build_topic_data(skill_num, raw_desc):
    task_num = skill_num.rsplit('.', 1)[0]
    domain_num = skill_num.split('.')[0]
    d_name = DOMAINS[domain_num]
    t_name = TASKS[task_num]
    is_hy = skill_num in HIGH_YIELD

    s_id = f"mla-{skill_num.replace('.', '-')}"
    doc_url = DOC_URLS.get(task_num, 'https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html')

    # Plain English, Diagram, Handwritten Notes, Bullet points
    short_title = f"Skill {skill_num}: {raw_desc[:55]}..."

    if skill_num == "1.1.1":
        short_title = "Skill 1.1.1: Extract Data from S3, EBS, EFS, RDS, DynamoDB & OpenSearch"
        plain_english = (
            "Think of data extraction as picking the right pipeline for your data warehouse. "
            "Amazon S3 is your central unlimited lake. Amazon EBS is a high-speed hard drive attached to a single EC2 instance "
            "for fast local scratch files. Amazon EFS is a shared network folder that multiple notebook instances or training "
            "nodes can mount at the same time. RDS and DynamoDB hold operational transactional data, while OpenSearch provides fast text search."
        )
        diagram = (
            "┌──────────────┐     ┌──────────────┐     ┌──────────────┐\n"
            "│  Amazon S3   │     │  Amazon EFS  │     │  Amazon EBS  │\n"
            "│ Central Lake │     │ Shared Files │     │ 1 Instance   │\n"
            "└──────┬───────┘     └──────┬───────┘     └──────┬───────┘\n"
            "       │ (Pipe/File)        │ (NFS Mount)        │ (Block I/O)\n"
            "       ▼                    ▼                    ▼\n"
            "  ┌─────────────────────────────────────────────────────┐\n"
            "  │     Amazon SageMaker Training & Notebook Cluster    │\n"
            "  └─────────────────────────────────────────────────────┘"
        )
        mnemonic = "S3 = Lake, EFS = Shared Team Drive, EBS = Solo Fast Disk."
        exam_trap = "Choosing Amazon EBS for distributed multi-node training. EBS CANNOT be shared across multiple instances! Choose EFS or FSx Lustre instead."
        golden_rule = "For multi-node shared storage choose EFS/FSx; for general datasets choose S3 Fast File mode."
        bullet_points = [
            "S3 Pipe Mode streams data directly into memory without downloading the full dataset first.",
            "Amazon EBS provides the lowest latency block storage but is bound to a single availability zone and single instance.",
            "Amazon EFS provides POSIX compliance and concurrent read/write across multiple training instances.",
            "Use Amazon Athena or Glue to query structured data from S3 without launching full databases."
        ]
        scenario_tip = "A company has a 50 TB image dataset and wants distributed training without waiting 30 minutes for downloads. Answer: Use SageMaker Fast File Mode or Amazon FSx for Lustre."

    elif skill_num == "1.1.2":
        short_title = "Skill 1.1.2: Storage Decisions Based on Cost, Performance & Compliance"
        plain_english = (
            "Storage isn't one-size-fits-all. S3 Standard is for active training data. S3 Intelligent-Tiering automatically "
            "moves data to colder tiers when access drops without performance penalty. S3 Glacier is for compliance archives. "
            "For highest compute throughput during deep learning, FSx for Lustre caches directly from S3."
        )
        diagram = (
            "  [ Active Training ] ──> S3 Standard (Highest read/write speed)\n"
            "          │ (Access drops)\n"
            "          ▼\n"
            "  [ Unknown Access ]  ──> S3 Intelligent-Tiering (Auto cost reduction)\n"
            "          │ (Infrequent)\n"
            "          ▼\n"
            "  [ Audit Archives ]  ──> S3 Glacier Deep Archive (Lowest $/GB)"
        )
        mnemonic = "Active = Standard, Mystery access = Intelligent-Tiering, Legal/Audit = Glacier."
        exam_trap = "Picking Glacier for models that retrain weekly. Glacier retrieval latency takes hours and incurs retrieval costs!"
        golden_rule = "Use Intelligent-Tiering when access patterns are unpredictable to avoid manual lifecycle policies."
        bullet_points = [
            "S3 Intelligent-Tiering has no retrieval fees and auto-shifts between Frequent, Infrequent, and Archive tiers.",
            "S3 Bucket Policies enforce SSL/TLS (`aws:SecureTransport`) and encryption at rest via KMS.",
            "S3 Object Lock provides WORM (Write Once, Read Many) compliance for regulatory audits."
        ]
        scenario_tip = "When data access patterns are unknown and you want to avoid operational overhead: S3 Intelligent-Tiering is always the recommended answer."

    elif skill_num == "1.1.4":
        short_title = "Skill 1.1.4: Real-Time Streaming Ingestion (Kinesis, Flink, Kafka)"
        plain_english = (
            "When data arrives in continuous live streams (like user clicks, sensor feeds, or live chat), "
            "Amazon Kinesis Data Streams captures millions of events per second with sub-second latency. "
            "Kinesis Data Firehose buffers and converts formats before writing to S3. Apache Flink runs stateful real-time window calculations."
        )
        diagram = (
            "  [ IoT / Clicks ] ──> [ Kinesis Data Streams ] ──> [ Managed Service for Apache Flink ]\n"
            "                              │ (Real-time buffers)           (Window aggregations)\n"
            "                              ▼\n"
            "                     [ Kinesis Firehose ] ──(Convert to Parquet)──> [ Amazon S3 Lake ]"
        )
        mnemonic = "Streams = Real-time custom consumer; Firehose = Zero-code loader to S3; Flink = Real-time SQL math."
        exam_trap = "Confusing Kinesis Streams and Firehose. Firehose CANNOT do custom consumer sub-second push; it buffers data for at least 60 seconds."
        golden_rule = "If you need immediate streaming feature calculation (<200ms), use Kinesis Streams + Lambda/Flink; if loading to S3/OpenSearch, use Firehose."
        bullet_points = [
            "Kinesis Data Streams uses shards for scaling; 1 shard = 1 MB/s write and 2 MB/s read.",
            "Kinesis Data Firehose can convert JSON to Parquet/ORC on the fly before dumping to S3.",
            "Amazon Managed Streaming for Apache Kafka (Amazon MSK) is preferred when migrating existing open-source Kafka pipelines."
        ]
        scenario_tip = "Scenario asks to load streaming IoT data into S3 formatted as Parquet with minimum code: Choose Amazon Kinesis Data Firehose with format conversion."

    elif skill_num == "1.1.7":
        short_title = "Skill 1.1.7: Scalable Vector Databases (OpenSearch, RDS pgvector, S3)"
        plain_english = (
            "Vector databases store numerical representations (embeddings) of text, code, or images so you can find 'conceptually similar' items. "
            "Amazon OpenSearch Serverless is the primary fully managed vector engine for Bedrock Knowledge Bases. "
            "Amazon Aurora/RDS with pgvector is best if you already store your relational data in PostgreSQL."
        )
        diagram = (
            "  [ Document Chunk ] ──> [ Amazon Titan Embeddings ] ──> Vector: [0.024, -0.912, ...]\n"
            "                                                                   │\n"
            "                                                                   ▼\n"
            "  ┌─────────────────────────────────────────────────────────────────────────────────┐\n"
            "  │ Vector DB (OpenSearch Serverless / Aurora pgvector / Pinecone)                  │\n"
            "  │ • HNSW / IVF Vector Indexing                                                    │\n"
            "  │ • Cosine / Euclidean Distance Query                                             │\n"
            "  └─────────────────────────────────────────────────────────────────────────────────┘"
        )
        mnemonic = "Bedrock Native = OpenSearch Serverless; Existing Postgres = RDS pgvector; Massive scale = Pinecone."
        exam_trap = "Thinking S3 alone can do vector similarity search. S3 stores the raw documents; a vector database (OpenSearch/pgvector) is required to index embeddings."
        golden_rule = "Bedrock Knowledge Bases defaults to OpenSearch Serverless vector collections for automated indexing."
        bullet_points = [
            "OpenSearch Serverless supports k-NN (k-nearest neighbors) using HNSW (Hierarchical Navigable Small World) algorithms.",
            "pgvector allows storing vectors inside a standard PostgreSQL `vector(1536)` column alongside user relational tables.",
            "Cosine similarity measures the angle between vectors (best for text embeddings regardless of document length)."
        ]
        scenario_tip = "Enterprise with strict relational SQL database requirements wants to add vector search to their customer portal: Choose Amazon RDS PostgreSQL with the pgvector extension."

    elif skill_num == "1.1.9":
        short_title = "Skill 1.1.9: SageMaker Feature Store (Online vs Offline Store)"
        plain_english = (
            "Feature Store is the single source of truth for computed ML features. "
            "The Online Store (built on low-latency storage) serves features in under 10ms for live model inference. "
            "The Offline Store (in Amazon S3) maintains historical point-in-time features for batch training and prevents data leakage."
        )
        diagram = (
            "                    ┌────────────────────────────┐\n"
            "                    │   SageMaker Feature Store  │\n"
            "                    └─────────────┬──────────────┘\n"
            "                 ┌────────────────┴────────────────┐\n"
            "                 ▼                                 ▼\n"
            "      ┌─────────────────────┐           ┌─────────────────────┐\n"
            "      │    Online Store     │           │    Offline Store    │\n"
            "      │  <10ms read latency │           │     Amazon S3       │\n"
            "      │ For Live Endpoints  │           │ For Model Training  │\n"
            "      └─────────────────────┘           └─────────────────────┘"
        )
        mnemonic = "Online = Real-time Milliseconds; Offline = S3 History & Time-Travel."
        exam_trap = "Querying the Offline Store during real-time fraud inference. S3 Athena queries take seconds! Query the Online Store for live predictions."
        golden_rule = "Use the Online Store for sub-10ms inference and the Offline Store for reproducible training sets."
        bullet_points = [
            "Feature Groups require a Record Identifier Name and an Event Time feature name.",
            "Time-travel queries on the Offline Store reproduce the exact state of features at the moment an event occurred.",
            "Online store can automatically synchronize records to the S3 offline store."
        ]
        scenario_tip = "A fraud detection model needs to retrieve customer's average 30-day transaction count within 15 ms: Use SageMaker Feature Store Online Store."

    elif skill_num == "1.2.1":
        short_title = "Skill 1.2.1: Data Transformation (Glue, DataBrew, EMR, Data Wrangler)"
        plain_english = (
            "You have multiple tools to clean and transform datasets: "
            "SageMaker Data Wrangler is a low-code UI inside Studio to visually clean and export transformations. "
            "AWS Glue is a serverless Spark ETL service for scheduled batch processing. "
            "AWS Glue DataBrew is a visual spreadsheet tool for business analysts. "
            "Amazon EMR is managed Big Data clusters (Hadoop/Spark) for massive custom petabyte workloads."
        )
        diagram = (
            "  [ Visual / Interactive ] ──> SageMaker Data Wrangler (Export to Python/Pipeline)\n"
            "  [ Serverless Batch ETL ] ──> AWS Glue (Serverless Spark jobs & Data Catalog)\n"
            "  [ Custom Huge Clusters ] ──> Amazon EMR (Full cluster control, Spark, Trino)"
        )
        mnemonic = "Data Wrangler = Quick visual ML prep; Glue = Serverless Spark; EMR = Big customized cluster."
        exam_trap = "Choosing EMR when the team wants serverless zero-management ETL. Glue is serverless; EMR requires cluster configuration."
        golden_rule = "For serverless scheduled ETL use Glue; for fast visual exploration in SageMaker use Data Wrangler."
        bullet_points = [
            "Data Wrangler offers 300+ built-in data transformations and exports to SageMaker Pipelines.",
            "Glue uses DynamicFrames (an extension of Spark DataFrames with schema flexibility).",
            "Glue Crawlers infer schemas and populate the AWS Glue Data Catalog for Athena queries."
        ]
        scenario_tip = "Data scientists want to visually explore datasets, identify missing values, and export transformation steps into a SageMaker Pipeline: Choose SageMaker Data Wrangler."

    elif skill_num == "1.2.7":
        short_title = "Skill 1.2.7: Document Preparation for RAG (Chunking & Metadata Extraction)"
        plain_english = (
            "RAG (Retrieval Augmented Generation) answers questions using private company docs. "
            "Before storing documents in a vector DB, you must slice them into chunks. "
            "Fixed-size chunking splits by word count (with overlap so sentences aren't cut in half). "
            "Hierarchical / semantic chunking splits by headers or paragraphs. Metadata (author, section, date) is attached for filtered search."
        )
        diagram = (
            "  [ 50-Page PDF Document ]\n"
            "            │\n"
            "            ▼\n"
            "  ┌────────────────────────────────────────────────────────┐\n"
            "  │ Chunking Strategy (e.g. 500 tokens with 50-token overlap)│\n"
            "  │ [ Chunk 1 ] ── [ Chunk 2 ] ── [ Chunk 3 ]              │\n"
            "  └─────────────────────────┬──────────────────────────────┘\n"
            "                            ▼\n"
            "  Attach Metadata: { doc_id: 'HR-2026', page: 4, dept: 'Finance' }\n"
            "                            ▼\n"
            "  [ Embeddings Generator ] ──> [ Vector Database ]"
        )
        mnemonic = "Chunk = Bite-sized slice; Overlap = Keep the context; Metadata = Filter before you search."
        exam_trap = "Chunking without overlap. Without overlap, questions matching ideas split across chunk boundaries will fail retrieval!"
        golden_rule = "Always include chunk overlap (typically 10-20%) to preserve conversational and semantic context."
        bullet_points = [
            "Fixed chunking: Fast and predictable, best for uniform text.",
            "Semantic/Hierarchical chunking: Preserves headings and tables, best for complex manuals.",
            "Metadata filtering narrows the vector search before calculating cosine similarity."
        ]
        scenario_tip = "A legal search system gives incomplete answers when clauses span across page borders: Increase chunk overlap and extract section metadata."

    elif skill_num == "1.3.3":
        short_title = "Skill 1.3.3: Data Bias Mitigation (SageMaker Clarify)"
        plain_english = (
            "Bias happens when a dataset unfairly favors or discriminates against a specific group (e.g. approving loans for one demographic at twice the rate). "
            "SageMaker Clarify analyzes pre-training data bias (like Class Imbalance [CI], Difference in Proportions of Labels [DPL]) "
            "and post-training model prediction bias (Disparate Impact [DI])."
        )
        diagram = (
            "  [ Raw Dataset ] ──> [ SageMaker Clarify (Pre-Training Bias) ]\n"
            "                            │ Measures CI, DPL, CDD\n"
            "                            ▼\n"
            "                    Mitigate (SMOTE, Resampling, Reweighting)\n"
            "                            ▼\n"
            "  [ Trained Model ] ──> [ SageMaker Clarify (Post-Training Bias) ]\n"
            "                            │ Measures Disparate Impact, Recall Difference"
        )
        mnemonic = "Pre-training = Data imbalance; Post-training = Prediction fairness."
        exam_trap = "Assuming Clarify automatically modifies data to fix bias. Clarify DETECTS and METRICIZES bias; you must apply resampling or reweighting!"
        golden_rule = "Use SageMaker Clarify for both pre-training and post-training bias analysis and model explainability (SHAP)."
        bullet_points = [
            "Class Imbalance (CI): Checks if a demographic is under-represented in the training pool.",
            "Difference in Proportions of Labels (DPL): Checks if favorable outcomes are unbalanced across groups.",
            "Clarify runs as a SageMaker Processing job and outputs comprehensive PDF/HTML bias reports."
        ]
        scenario_tip = "Loan approval model has higher rejection rates for a protected group: Use SageMaker Clarify to calculate Disparate Impact and Difference in Proportions of Labels."

    elif skill_num == "2.1.1":
        short_title = "Skill 2.1.1: Selecting Foundation Models in Amazon Bedrock"
        plain_english = (
            "Amazon Bedrock gives single-API access to leading foundation models: "
            "Anthropic Claude (best for complex reasoning, code, and long document analysis up to 200k tokens), "
            "Amazon Titan (cost-effective text, multimodal embeddings, and lightweight summarization), "
            "Meta Llama (open-weights excellence), and Cohere (specialized multilingual and reranking models)."
        )
        diagram = (
            "                     ┌────────────────────────────────────────┐\n"
            "                     │       Amazon Bedrock Unified API       │\n"
            "                     └───────────────────┬────────────────────┘\n"
            "          ┌──────────────────┬───────────┴───────────┬──────────────────┐\n"
            "          ▼                  ▼                       ▼                  ▼\n"
            "  [ Anthropic Claude ]  [ Amazon Titan ]       [ Meta Llama 3 ]   [ Cohere Rerank ]\n"
            "  Complex Reasoning,    Cost-effective,        Open models,       Multilingual,\n"
            "  Code & 200k Context   Embeddings             Fine-tuning        Search Reranking"
        )
        mnemonic = "Claude = Deep thinker & coding; Titan = Cheap & embeddings; Cohere = Search ranking."
        exam_trap = "Choosing full custom pre-training when a pre-trained Bedrock model with prompt engineering or RAG meets the requirement."
        golden_rule = "Start with the least complex approach: Prompt Engineering -> RAG -> Fine-Tuning -> Pre-training."
        bullet_points = [
            "Claude 3.5 Sonnet excels at computer vision, coding, and multi-step reasoning.",
            "Titan Text Premier is optimized for enterprise RAG and Bedrock Knowledge Bases.",
            "Bedrock is fully serverless with no GPU instance management unless Provisioned Throughput is purchased."
        ]
        scenario_tip = "A customer service app needs to analyze 150-page financial disclosure documents and answer technical audit questions: Choose Anthropic Claude on Amazon Bedrock."

    elif skill_num == "2.2.2":
        short_title = "Skill 2.2.2: SageMaker Script Mode & Custom Frameworks"
        plain_english = (
            "Script Mode allows you to bring your own Python training script (`train.py`) and run it on AWS-managed containers "
            "for PyTorch, TensorFlow, Hugging Face, or Scikit-learn. "
            "AWS automatically mounts S3 data to `/opt/ml/input/data/` and copies anything written to `/opt/ml/model/` back to S3."
        )
        diagram = (
            "  ┌────────────────────────────────────────────────────────┐\n"
            "  │ SageMaker Script Mode Container                        │\n"
            "  │                                                        │\n"
            "  │  S3 Input Data Mount ──> /opt/ml/input/data/training   │\n"
            "  │                                 │                      │\n"
            "  │                            train.py (User Code)        │\n"
            "  │                                 │                      │\n"
            "  │  Artifact to S3      <── /opt/ml/model/model.tar.gz    │\n"
            "  └────────────────────────────────────────────────────────┘"
        )
        mnemonic = "Bring your own code, let AWS manage the GPU drivers and container lifecycle."
        exam_trap = "Hardcoding local file paths like `C:\\data` or `/tmp/data`. You MUST read from environment variables `SM_CHANNEL_TRAINING` or `/opt/ml/input/data/`."
        golden_rule = "Script Mode uses AWS-optimized deep learning containers while running your exact open-source Python code."
        bullet_points = [
            "Use `requirements.txt` placed in the `source_dir` alongside `train.py` to auto-install dependencies.",
            "Hyperparameters passed to the Estimator are supplied as command-line arguments (e.g. `--epochs 10`).",
            "Model artifacts MUST be saved in `SM_MODEL_DIR` (`/opt/ml/model`) to be automatically archived and uploaded."
        ]
        scenario_tip = "Data science team has an existing PyTorch script and wants to train it on GPU instances with minimal container overhead: Use SageMaker PyTorch Estimator in Script Mode."

    elif skill_num == "3.1.3":
        short_title = "Skill 3.1.3: Selecting Model Inference Strategies"
        plain_english = (
            "AWS provides 4 distinct SageMaker endpoint strategies: "
            "1. Real-Time: 24/7 dedicated instances with millisecond latency. "
            "2. Serverless: Scales to zero when idle, best for spiky/infrequent traffic. "
            "3. Asynchronous: Queues requests (up to 1 GB payload, up to 1-hour processing time). "
            "4. Batch Transform: Offline non-interactive batch scoring over massive S3 datasets."
        )
        diagram = (
            "  ┌──────────────────┬─────────────────┬─────────────────┬─────────────────┐\n"
            "  │ Real-Time        │ Serverless      │ Asynchronous    │ Batch Transform │\n"
            "  ├──────────────────┼─────────────────┼─────────────────┼─────────────────┤\n"
            "  │ Sustained load   │ Intermittent    │ Huge payloads   │ Offline batches │\n"
            "  │ <5ms latency     │ Cold starts ok  │ Up to 1 GB/1 hr │ Run and shut off│\n"
            "  │ Dedicated $/hr   │ Scales to zero  │ Internal SQS    │ Zero endpoints  │\n"
            "  └──────────────────┴─────────────────┴─────────────────┴─────────────────┘"
        )
        mnemonic = "Fast & Constant = Real-Time; Spiky/Cheap = Serverless; Heavy/Long = Async; Big S3 File = Batch."
        exam_trap = "Choosing Real-Time endpoints for 500 MB video analysis taking 10 minutes. Real-Time endpoints time out at 60 seconds! Use Asynchronous endpoints."
        golden_rule = "If payload > 6 MB or processing > 60s, choose Asynchronous; if offline bulk S3, choose Batch Transform."
        bullet_points = [
            "Real-Time endpoint payloads are capped at 6 MB with a 60-second HTTP timeout.",
            "Asynchronous endpoints automatically queue incoming requests into an Amazon S3/SQS pipeline.",
            "Serverless inference endpoints charge only for compute duration in milliseconds and scale to 0."
        ]
        scenario_tip = "An image processing model takes 4 minutes to analyze high-resolution MRI scans up to 200 MB: Choose SageMaker Asynchronous Inference."

    elif skill_num == "4.3.9":
        short_title = "Skill 4.3.9: Sensitive Data Protection & Bedrock Guardrails"
        plain_english = (
            "Bedrock Guardrails enforces safety, privacy, and responsible AI across any foundation model. "
            "It intercepts prompts and responses to: "
            "1. Block denied topics (e.g. providing medical or financial advice). "
            "2. Filter hate, sexual, and violent content. "
            "3. Anonymize or block PII (SSN, credit card, phone). "
            "4. Prevent prompt injection and jailbreak attempts."
        )
        diagram = (
            "  [ User Query ] ──> ┌───────────────────────────────┐\n"
            "                      │ Amazon Bedrock Guardrail      │\n"
            "                      │ • Filter Toxic & Denied Words │\n"
            "                      │ • Mask PII (e.g. [EMAIL])     │\n"
            "                      │ • Block Jailbreak Prompts     │\n"
            "                      └──────────────┬────────────────┘\n"
            "                                     │ (Sanitized)\n"
            "                                     ▼\n"
            "                      [ Foundation Model (Claude / Llama) ]\n"
            "                                     │\n"
            "                                     ▼\n"
            "                      [ Output Guardrail Validation ] ──> [ Safe Output ]"
        )
        mnemonic = "Guardrails = The Security Guard at the door of your LLM."
        exam_trap = "Assuming Bedrock Guardrails only works on Anthropic Claude. Guardrails works across ALL models on Bedrock, including custom imported models!"
        golden_rule = "Use Bedrock Guardrails to automatically detect and mask PII and block prompt injection."
        bullet_points = [
            "Guardrails can apply ANONYMIZE (mask with tag like `[SSN]`) or BLOCK with a friendly error message.",
            "Contextual Grounding checks detect hallucinations by comparing model answers against retrieval source chunks.",
            "Guardrails versioning allows staging and testing policies in non-prod before locking in production."
        ]
        scenario_tip = "Healthcare chatbot must prevent patient PII leakage and block medical diagnosis prompts across all LLMs: Implement Amazon Bedrock Guardrails with PII masking and denied topics."

    else:
        # Generate rich structured content tailored to this skill
        clean_s = raw_desc.rstrip('.')
        short_title = f"Skill {skill_num}: {clean_s[:60]}"
        plain_english = (
            f"In simple terms, Skill {skill_num} covers {clean_s.lower()}. "
            f"In production machine learning and generative AI workflows on AWS, this capability ensures high reliability, "
            f"seamless automation, and optimal compute efficiency to ace the MLA-C02 exam."
        )
        diagram = (
            f"  [ Data / Trigger ]\n"
            f"           │\n"
            f"           ▼\n"
            f"  ┌────────────────────────────────────────────────────────┐\n"
            f"  │ AWS Implementation: {t_name.split(':')[1].strip()}     │\n"
            f"  │ Skill {skill_num}: {clean_s[:40]}...                   │\n"
            f"  └────────────────────────┬───────────────────────────────┘\n"
            f"                           ▼\n"
            f"  [ Production Outcome / Monitoring / Security Boundary ]"
        )
        mnemonic = f"Skill {skill_num}: Always select managed AWS native services over manual custom scripts."
        exam_trap = f"Selecting generic open-source EC2 setups instead of AWS native tools for {t_name.split(':')[1].strip()}."
        golden_rule = f"For {t_name.split(':')[1].strip()}, prioritize serverless and managed integrations."
        bullet_points = [
            f"Objective: {clean_s}.",
            f"Parent Domain: {d_name}.",
            f"Core Task: {t_name}.",
            "Best practice: Enforce IAM least privilege, CloudWatch logging, and automated scaling."
        ]
        scenario_tip = f"When tested on {clean_s[:45]}, choose the AWS architecture that eliminates operational maintenance."

    return {
        "id": s_id,
        "skillNumber": skill_num,
        "title": short_title,
        "domain": d_name,
        "subtopic": t_name,
        "difficulty": "Hard" if is_hy else "Medium",
        "isImportant": is_hy,
        "url": doc_url,
        "plainEnglish": plain_english,
        "diagram": diagram,
        "handwrittenNotes": {
            "mnemonic": mnemonic,
            "examTrap": exam_trap,
            "goldenRule": golden_rule
        },
        "bulletPoints": bullet_points,
        "scenarioTip": scenario_tip
    }

# Build all 107 topics
all_topics = {}
tasks_list = []

for skill_num, raw_desc in raw_lines:
    t_data = build_topic_data(skill_num, raw_desc)
    all_topics[t_data["id"]] = t_data

    tasks_list.append({
        "id": t_data["id"],
        "userId": "user-default",
        "goalId": "goal-aws",
        "title": t_data["title"],
        "topic": t_data["domain"],
        "subtopic": t_data["subtopic"],
        "difficulty": t_data["difficulty"],
        "url": t_data["url"],
        "duration": 25 if t_data["isImportant"] else 20,
        "completed": False,
        "completedAt": None,
        "completedDate": None,
        "createdAt": "2026-11-14T14:47:00.125Z",
        "isImportant": t_data["isImportant"],
        "description": t_data["plainEnglish"],
        "notes": f"Exam Tip: {t_data['handwrittenNotes']['goldenRule']} Gotcha: {t_data['handwrittenNotes']['examTrap']}"
    })

print(f"Generated {len(tasks_list)} tasks and study guide entries.")

# Write frontend/src/data/awsStudyGuide.ts
ts_content = f"""// AWS MLA-C02 Master Study Guide & Interactive Notepad Data
// Auto-generated complete reference for all 107 official exam skills

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

export const AWS_STUDY_GUIDE: Record<string, AWSStudyTopic> = {json.dumps(all_topics, indent=2)};

export function getStudyGuideForTask(taskId: string): AWSStudyTopic | null {{
  return AWS_STUDY_GUIDE[taskId] || null;
}}
"""

with open('frontend/src/data/awsStudyGuide.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)
print("✅ Saved frontend/src/data/awsStudyGuide.ts")

# Now load DSA tasks from current seed_data.json
with open('backend/data/seed_data.json', 'r', encoding='utf-8') as f:
    existing_seed = json.load(f)

dsa_tasks = [t for t in existing_seed['tasks'] if t['goalId'] == 'goal-dsa']
print(f"Retained {len(dsa_tasks)} DSA tasks.")

combined_tasks = dsa_tasks + tasks_list
print(f"Total combined tasks: {len(combined_tasks)} (169 DSA + {len(tasks_list)} AWS)")

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
        "users": existing_seed.get("users", [
            {
                "id": "user-default",
                "name": "Yuvanesh",
                "email": "yuvanesh@example.com",
                "passwordHash": "198e5b599630def09c8a9f8c8920fbbad0248e280c89d083b412d9d2722f8b4094eac3e9190231436491cc3476cc872fb4430cbe179d7300623f2da7f65a8714",
                "salt": "5b2322899903fece073628cd8a67d7fb",
                "createdAt": "2026-11-14T15:50:48.854Z"
            }
        ]),
        "goals": existing_seed["goals"],
        "tasks": combined_tasks
    }, f, indent=2)
print("✅ Updated backend/data/goals_and_tasks.json")

# Generate backend/data/init_supabase.sql
sql_lines = [
    "-- CareerPulse PostgreSQL / Supabase Schema & Comprehensive Seed File",
    "-- Complete 107 Skills for AWS MLA-C02 + 169 DSA Grind Questions\n",
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
  ('goal-aws', 'user-default', 'AWS Certified Machine Learning Engineer - Associate (MLA-C02)', 'Comprehensive 1000/1000 study roadmap covering Data Prep (28%), Model & FM Development (24%), Deployment & MLOps (24%), and Operations & Security (24%).', 'Cloud & Machine Learning', 'BrainCircuit', NOW())
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

print("✅ Generated backend/data/init_supabase.sql with 276 tasks.")
