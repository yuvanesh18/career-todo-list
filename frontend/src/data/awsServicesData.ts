// AWS In-Scope Services Master Reference (81 Services across 14 Categories)
export interface AWSServiceItem {
  id: string;
  serviceName: string;
  category: string;
  isImportant: boolean;
  role: string;
  plainEnglish?: string;
  diagram?: string;
  handwrittenNotes?: {
    mnemonic: string;
    examTrap: string;
    goldenRule: string;
  };
  bulletPoints?: string[];
  scenarioTip?: string;
  url: string;
}

export const AWS_IN_SCOPE_SERVICES: Record<string, AWSServiceItem> = {
  "svc-athena": {
    "id": "svc-athena",
    "serviceName": "Amazon Athena",
    "category": "Analytics",
    "isImportant": true,
    "role": "In-scope Analytics service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon Athena is a key AWS service in the Analytics category. In the MLA-C02 exam, understanding how Amazon Athena integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon Athena (Analytics) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Athena: Master its role in the Analytics domain.",
      "examTrap": "Confusing Amazon Athena with other Analytics services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon Athena is preferred over alternative services for Analytics workloads."
    },
    "bulletPoints": [
      "Category: Analytics.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon Athena: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/athena/latest/userguide/what-is.html"
  },
  "svc-data-firehose": {
    "id": "svc-data-firehose",
    "serviceName": "Amazon Data Firehose",
    "category": "Analytics",
    "isImportant": true,
    "role": "In-scope Analytics service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon Data Firehose is a key AWS service in the Analytics category. In the MLA-C02 exam, understanding how Amazon Data Firehose integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon Data Firehose (Analytics) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Data Firehose: Master its role in the Analytics domain.",
      "examTrap": "Confusing Amazon Data Firehose with other Analytics services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon Data Firehose is preferred over alternative services for Analytics workloads."
    },
    "bulletPoints": [
      "Category: Analytics.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon Data Firehose: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/datafirehose/latest/userguide/what-is.html"
  },
  "svc-emr": {
    "id": "svc-emr",
    "serviceName": "Amazon EMR",
    "category": "Analytics",
    "isImportant": false,
    "role": "In-scope Analytics service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon EMR is a key AWS service in the Analytics category. In the MLA-C02 exam, understanding how Amazon EMR integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon EMR (Analytics) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon EMR: Master its role in the Analytics domain.",
      "examTrap": "Confusing Amazon EMR with other Analytics services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon EMR is preferred over alternative services for Analytics workloads."
    },
    "bulletPoints": [
      "Category: Analytics.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon EMR: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/emr/latest/userguide/what-is.html"
  },
  "svc-glue": {
    "id": "svc-glue",
    "serviceName": "AWS Glue",
    "category": "Analytics",
    "isImportant": true,
    "role": "Serverless data integration and ETL service: Data Catalog, schema inference crawlers, and Spark jobs.",
    "plainEnglish": "AWS Glue runs Apache Spark jobs without you needing to manage Hadoop or EC2 clusters. Its crawlers scan S3, discover schemas, and populate the Glue Data Catalog so Athena and SageMaker can query files like database tables.",
    "diagram": "  [ S3 Raw Data ] \u2500\u2500> [ AWS Glue Crawler ] \u2500\u2500> [ Glue Data Catalog ] <\u2500\u2500 [ Amazon Athena ]\n                             \u2502\n                             \u25bc\n                     [ Glue Spark ETL ] \u2500\u2500(Convert to Parquet)\u2500\u2500> [ Clean S3 Lake ]",
    "handwrittenNotes": {
      "mnemonic": "Glue = Serverless Spark ETL + Data Catalog glue that connects everything.",
      "examTrap": "Spinning up an Amazon EMR cluster for scheduled hourly ETL. Glue is serverless and costs nothing when idle.",
      "goldenRule": "Choose AWS Glue for serverless ETL and schema discovery over S3 data lakes."
    },
    "bulletPoints": [
      "Glue DynamicFrames provide schema flexibility, handling mixed types in JSON automatically.",
      "Glue DataBrew provides 250+ pre-built transformations for visual data preparation.",
      "Glue Data Quality defines rules to validate row counts, nullness, and data ranges automatically."
    ],
    "scenarioTip": "Scheduled batch pipeline must convert raw JSON logs in S3 into partitioned Parquet files with zero cluster management: Choose AWS Glue ETL job.",
    "url": "https://docs.aws.amazon.com/glue/latest/userguide/what-is.html"
  },
  "svc-glue-databrew": {
    "id": "svc-glue-databrew",
    "serviceName": "AWS Glue DataBrew",
    "category": "Analytics",
    "isImportant": true,
    "role": "In-scope Analytics service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS Glue DataBrew is a key AWS service in the Analytics category. In the MLA-C02 exam, understanding how AWS Glue DataBrew integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS Glue DataBrew (Analytics) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Glue DataBrew: Master its role in the Analytics domain.",
      "examTrap": "Confusing AWS Glue DataBrew with other Analytics services in multiple-choice questions.",
      "goldenRule": "Understand when AWS Glue DataBrew is preferred over alternative services for Analytics workloads."
    },
    "bulletPoints": [
      "Category: Analytics.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS Glue DataBrew: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/gluedatabrew/latest/userguide/what-is.html"
  },
  "svc-glue-data-quality": {
    "id": "svc-glue-data-quality",
    "serviceName": "AWS Glue Data Quality",
    "category": "Analytics",
    "isImportant": false,
    "role": "In-scope Analytics service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS Glue Data Quality is a key AWS service in the Analytics category. In the MLA-C02 exam, understanding how AWS Glue Data Quality integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS Glue Data Quality (Analytics) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Glue Data Quality: Master its role in the Analytics domain.",
      "examTrap": "Confusing AWS Glue Data Quality with other Analytics services in multiple-choice questions.",
      "goldenRule": "Understand when AWS Glue Data Quality is preferred over alternative services for Analytics workloads."
    },
    "bulletPoints": [
      "Category: Analytics.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS Glue Data Quality: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/gluedataquality/latest/userguide/what-is.html"
  },
  "svc-kinesis": {
    "id": "svc-kinesis",
    "serviceName": "Amazon Kinesis",
    "category": "Analytics",
    "isImportant": true,
    "role": "Real-time streaming ingestion: Kinesis Data Streams (sub-second records), Firehose (buffer and load to S3), and Flink (streaming SQL).",
    "plainEnglish": "Amazon Kinesis captures continuous live data feeds\u2014like user clickstreams, IoT telemetry, or financial transactions\u2014and delivers them immediately to downstream ML inference models or storage lakes.",
    "diagram": "  [ Real-Time Events ] \u2500\u2500> [ Kinesis Data Streams ] \u2500\u2500> [ Lambda / Real-Time Model ]\n                                    \u2502\n                                    \u25bc\n                           [ Kinesis Firehose ] \u2500\u2500(Parquet)\u2500\u2500> [ Amazon S3 ]",
    "handwrittenNotes": {
      "mnemonic": "Streams = Sub-second real-time; Firehose = Auto-loader to S3/OpenSearch; Flink = Live SQL.",
      "examTrap": "Choosing Firehose when sub-second real-time latency is required. Firehose buffers for at least 60 seconds or 1 MB!",
      "goldenRule": "If latency must be < 200 ms, use Kinesis Data Streams; if loading to S3/OpenSearch without code, use Firehose."
    },
    "bulletPoints": [
      "Kinesis Streams scales by shards: 1 shard = 1,000 records/sec or 1 MB/sec write, 2 MB/sec read.",
      "Firehose can automatically convert JSON to Parquet or ORC on the fly before storing in S3.",
      "Kinesis Video Streams ingests and encrypts live video feeds for Rekognition Video."
    ],
    "scenarioTip": "Need to stream live user behavior data to S3 formatted as Parquet with minimum operational effort: Choose Amazon Data Firehose.",
    "url": "https://docs.aws.amazon.com/kinesis/latest/userguide/what-is.html"
  },
  "svc-lake-formation": {
    "id": "svc-lake-formation",
    "serviceName": "AWS Lake Formation",
    "category": "Analytics",
    "isImportant": false,
    "role": "In-scope Analytics service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS Lake Formation is a key AWS service in the Analytics category. In the MLA-C02 exam, understanding how AWS Lake Formation integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS Lake Formation (Analytics) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Lake Formation: Master its role in the Analytics domain.",
      "examTrap": "Confusing AWS Lake Formation with other Analytics services in multiple-choice questions.",
      "goldenRule": "Understand when AWS Lake Formation is preferred over alternative services for Analytics workloads."
    },
    "bulletPoints": [
      "Category: Analytics.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS Lake Formation: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/lakeformation/latest/userguide/what-is.html"
  },
  "svc-flink": {
    "id": "svc-flink",
    "serviceName": "Amazon Managed Service for Apache Flink",
    "category": "Analytics",
    "isImportant": false,
    "role": "In-scope Analytics service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon Managed Service for Apache Flink is a key AWS service in the Analytics category. In the MLA-C02 exam, understanding how Amazon Managed Service for Apache Flink integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon Managed Service for Apache Flink (Analytics) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Managed Service for Apache Flink: Master its role in the Analytics domain.",
      "examTrap": "Confusing Amazon Managed Service for Apache Flink with other Analytics services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon Managed Service for Apache Flink is preferred over alternative services for Analytics workloads."
    },
    "bulletPoints": [
      "Category: Analytics.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon Managed Service for Apache Flink: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/flink/latest/userguide/what-is.html"
  },
  "svc-opensearch": {
    "id": "svc-opensearch",
    "serviceName": "Amazon OpenSearch Service",
    "category": "Analytics",
    "isImportant": true,
    "role": "Search and analytics suite providing scalable vector database capabilities for Bedrock Knowledge Bases and RAG.",
    "plainEnglish": "OpenSearch Service (especially OpenSearch Serverless) indexes millions of high-dimensional vector embeddings and performs sub-second approximate nearest neighbor (ANN) similarity search using HNSW algorithms.",
    "diagram": "  [ Document Chunks ] \u2500\u2500> [ Titan Embeddings ] \u2500\u2500> [ OpenSearch Serverless Vector Index ]\n                                                                \u25b2\n                                                                \u2502 Cosine Similarity Search\n                                                    [ User Query Vector ]",
    "handwrittenNotes": {
      "mnemonic": "OpenSearch = High-speed vector database for RAG + full-text keyword search.",
      "examTrap": "Storing vectors in raw S3 and expecting fast similarity search. S3 cannot perform k-NN search; OpenSearch or pgvector is required.",
      "goldenRule": "Amazon Bedrock Knowledge Bases natively provisions and manages OpenSearch Serverless vector collections."
    },
    "bulletPoints": [
      "Supports k-NN plugin with HNSW and IVF indexing algorithms.",
      "OpenSearch Serverless automatically scales compute capacity (OCUs) up and down based on search volume.",
      "Hybrid search combines traditional BM25 keyword matching with vector semantic search for superior retrieval accuracy."
    ],
    "scenarioTip": "Enterprise needs a managed vector database for a Bedrock Knowledge Base that scales automatically without managing clusters: Choose Amazon OpenSearch Serverless vector collection.",
    "url": "https://docs.aws.amazon.com/opensearch/latest/userguide/what-is.html"
  },
  "svc-quicksight": {
    "id": "svc-quicksight",
    "serviceName": "Amazon QuickSight",
    "category": "Analytics",
    "isImportant": false,
    "role": "In-scope Analytics service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon QuickSight is a key AWS service in the Analytics category. In the MLA-C02 exam, understanding how Amazon QuickSight integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon QuickSight (Analytics) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon QuickSight: Master its role in the Analytics domain.",
      "examTrap": "Confusing Amazon QuickSight with other Analytics services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon QuickSight is preferred over alternative services for Analytics workloads."
    },
    "bulletPoints": [
      "Category: Analytics.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon QuickSight: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/quicksight/latest/userguide/what-is.html"
  },
  "svc-redshift": {
    "id": "svc-redshift",
    "serviceName": "Amazon Redshift",
    "category": "Analytics",
    "isImportant": false,
    "role": "In-scope Analytics service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon Redshift is a key AWS service in the Analytics category. In the MLA-C02 exam, understanding how Amazon Redshift integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon Redshift (Analytics) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Redshift: Master its role in the Analytics domain.",
      "examTrap": "Confusing Amazon Redshift with other Analytics services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon Redshift is preferred over alternative services for Analytics workloads."
    },
    "bulletPoints": [
      "Category: Analytics.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon Redshift: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/redshift/latest/userguide/what-is.html"
  },
  "svc-eventbridge": {
    "id": "svc-eventbridge",
    "serviceName": "Amazon EventBridge",
    "category": "Application Integration",
    "isImportant": true,
    "role": "In-scope Application Integration service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon EventBridge is a key AWS service in the Application Integration category. In the MLA-C02 exam, understanding how Amazon EventBridge integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon EventBridge (Application Integration) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon EventBridge: Master its role in the Application Integration domain.",
      "examTrap": "Confusing Amazon EventBridge with other Application Integration services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon EventBridge is preferred over alternative services for Application Integration workloads."
    },
    "bulletPoints": [
      "Category: Application Integration.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon EventBridge: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/eventbridge/latest/userguide/what-is.html"
  },
  "svc-mwaa": {
    "id": "svc-mwaa",
    "serviceName": "Amazon Managed Workflows for Apache Airflow (Amazon MWAA)",
    "category": "Application Integration",
    "isImportant": false,
    "role": "In-scope Application Integration service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon Managed Workflows for Apache Airflow (Amazon MWAA) is a key AWS service in the Application Integration category. In the MLA-C02 exam, understanding how Amazon Managed Workflows for Apache Airflow (Amazon MWAA) integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon Managed Workflows for Apache Airflow (Amazon MWAA) (Application Integration) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Managed Workflows for Apache Airflow (Amazon MWAA): Master its role in the Application Integration domain.",
      "examTrap": "Confusing Amazon Managed Workflows for Apache Airflow (Amazon MWAA) with other Application Integration services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon Managed Workflows for Apache Airflow (Amazon MWAA) is preferred over alternative services for Application Integration workloads."
    },
    "bulletPoints": [
      "Category: Application Integration.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon Managed Workflows for Apache Airflow (Amazon MWAA): Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/mwaa/latest/userguide/what-is.html"
  },
  "svc-sns": {
    "id": "svc-sns",
    "serviceName": "Amazon SNS",
    "category": "Application Integration",
    "isImportant": true,
    "role": "In-scope Application Integration service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon SNS is a key AWS service in the Application Integration category. In the MLA-C02 exam, understanding how Amazon SNS integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon SNS (Application Integration) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon SNS: Master its role in the Application Integration domain.",
      "examTrap": "Confusing Amazon SNS with other Application Integration services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon SNS is preferred over alternative services for Application Integration workloads."
    },
    "bulletPoints": [
      "Category: Application Integration.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon SNS: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/sns/latest/userguide/what-is.html"
  },
  "svc-sqs": {
    "id": "svc-sqs",
    "serviceName": "Amazon SQS",
    "category": "Application Integration",
    "isImportant": true,
    "role": "In-scope Application Integration service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon SQS is a key AWS service in the Application Integration category. In the MLA-C02 exam, understanding how Amazon SQS integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon SQS (Application Integration) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon SQS: Master its role in the Application Integration domain.",
      "examTrap": "Confusing Amazon SQS with other Application Integration services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon SQS is preferred over alternative services for Application Integration workloads."
    },
    "bulletPoints": [
      "Category: Application Integration.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon SQS: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/sqs/latest/userguide/what-is.html"
  },
  "svc-step-functions": {
    "id": "svc-step-functions",
    "serviceName": "AWS Step Functions",
    "category": "Application Integration",
    "isImportant": true,
    "role": "In-scope Application Integration service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS Step Functions is a key AWS service in the Application Integration category. In the MLA-C02 exam, understanding how AWS Step Functions integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS Step Functions (Application Integration) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Step Functions: Master its role in the Application Integration domain.",
      "examTrap": "Confusing AWS Step Functions with other Application Integration services in multiple-choice questions.",
      "goldenRule": "Understand when AWS Step Functions is preferred over alternative services for Application Integration workloads."
    },
    "bulletPoints": [
      "Category: Application Integration.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS Step Functions: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/stepfunctions/latest/userguide/what-is.html"
  },
  "svc-billing-cost-management": {
    "id": "svc-billing-cost-management",
    "serviceName": "AWS Billing and Cost Management",
    "category": "Cloud Financial Management",
    "isImportant": false,
    "role": "In-scope Cloud Financial Management service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS Billing and Cost Management is a key AWS service in the Cloud Financial Management category. In the MLA-C02 exam, understanding how AWS Billing and Cost Management integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS Billing and Cost Management (Cloud Financial Management) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Billing and Cost Management: Master its role in the Cloud Financial Management domain.",
      "examTrap": "Confusing AWS Billing and Cost Management with other Cloud Financial Management services in multiple-choice questions.",
      "goldenRule": "Understand when AWS Billing and Cost Management is preferred over alternative services for Cloud Financial Management workloads."
    },
    "bulletPoints": [
      "Category: Cloud Financial Management.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS Billing and Cost Management: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/billingcostmanagement/latest/userguide/what-is.html"
  },
  "svc-budgets": {
    "id": "svc-budgets",
    "serviceName": "AWS Budgets",
    "category": "Cloud Financial Management",
    "isImportant": false,
    "role": "In-scope Cloud Financial Management service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS Budgets is a key AWS service in the Cloud Financial Management category. In the MLA-C02 exam, understanding how AWS Budgets integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS Budgets (Cloud Financial Management) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Budgets: Master its role in the Cloud Financial Management domain.",
      "examTrap": "Confusing AWS Budgets with other Cloud Financial Management services in multiple-choice questions.",
      "goldenRule": "Understand when AWS Budgets is preferred over alternative services for Cloud Financial Management workloads."
    },
    "bulletPoints": [
      "Category: Cloud Financial Management.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS Budgets: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/budgets/latest/userguide/what-is.html"
  },
  "svc-cost-explorer": {
    "id": "svc-cost-explorer",
    "serviceName": "AWS Cost Explorer",
    "category": "Cloud Financial Management",
    "isImportant": true,
    "role": "In-scope Cloud Financial Management service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS Cost Explorer is a key AWS service in the Cloud Financial Management category. In the MLA-C02 exam, understanding how AWS Cost Explorer integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS Cost Explorer (Cloud Financial Management) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Cost Explorer: Master its role in the Cloud Financial Management domain.",
      "examTrap": "Confusing AWS Cost Explorer with other Cloud Financial Management services in multiple-choice questions.",
      "goldenRule": "Understand when AWS Cost Explorer is preferred over alternative services for Cloud Financial Management workloads."
    },
    "bulletPoints": [
      "Category: Cloud Financial Management.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS Cost Explorer: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/costexplorer/latest/userguide/what-is.html"
  },
  "svc-batch": {
    "id": "svc-batch",
    "serviceName": "AWS Batch",
    "category": "Compute",
    "isImportant": false,
    "role": "In-scope Compute service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS Batch is a key AWS service in the Compute category. In the MLA-C02 exam, understanding how AWS Batch integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS Batch (Compute) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Batch: Master its role in the Compute domain.",
      "examTrap": "Confusing AWS Batch with other Compute services in multiple-choice questions.",
      "goldenRule": "Understand when AWS Batch is preferred over alternative services for Compute workloads."
    },
    "bulletPoints": [
      "Category: Compute.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS Batch: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/batch/latest/userguide/what-is.html"
  },
  "svc-ec2": {
    "id": "svc-ec2",
    "serviceName": "Amazon EC2",
    "category": "Compute",
    "isImportant": true,
    "role": "Elastic compute instances providing accelerated GPU (G5, P4de) and custom AWS silicon (Trainium Trn1, Inferentia Inf2) for deep learning.",
    "plainEnglish": "Amazon EC2 gives you raw virtual machines in the cloud. For ML engineers, EC2 provides specialized GPU instances (NVIDIA A100/H100) and AWS Trainium/Inferentia chips when custom low-level cluster control is required.",
    "diagram": "  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Amazon EC2 Instance Families for Machine Learning     \u2502\n  \u2502 \u2022 G5 / G6  : NVIDIA A10G/L4 GPUs (General Training/Inf)\u2502\n  \u2502 \u2022 P4d / P5 : NVIDIA A100/H100 GPUs (Massive LLM Train) \u2502\n  \u2502 \u2022 Trn1     : AWS Trainium (50% cheaper LLM Training)   \u2502\n  \u2502 \u2022 Inf2     : AWS Inferentia2 (Lowest cost LLM Inference)\u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518",
    "handwrittenNotes": {
      "mnemonic": "Trn1 = Train on AWS silicon; Inf2 = Inference on AWS silicon; P4/P5 = Extreme NVIDIA power.",
      "examTrap": "Using P-series instances for simple inference. P-series are expensive training workhorses; use Inf2 or G-series for inference.",
      "goldenRule": "Use Inf2 for lowest-cost LLM inference and Trn1 for high-efficiency distributed model training."
    },
    "bulletPoints": [
      "Spot Instances offer up to 90% discount for fault-tolerant training jobs with checkpointing.",
      "Elastic Fabric Adapter (EFA) provides OS-bypass networking for low-latency multi-node GPU communication.",
      "AWS Graviton instances provide high-efficiency CPU inference for lightweight classical models."
    ],
    "scenarioTip": "Cost-sensitive team needs to run real-time inference for a 13B LLM: Choose Amazon EC2 Inf2 instances or SageMaker endpoints backed by Inf2.",
    "url": "https://docs.aws.amazon.com/ec2/latest/userguide/what-is.html"
  },
  "svc-lambda": {
    "id": "svc-lambda",
    "serviceName": "AWS Lambda",
    "category": "Compute",
    "isImportant": true,
    "role": "In-scope Compute service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS Lambda is a key AWS service in the Compute category. In the MLA-C02 exam, understanding how AWS Lambda integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS Lambda (Compute) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Lambda: Master its role in the Compute domain.",
      "examTrap": "Confusing AWS Lambda with other Compute services in multiple-choice questions.",
      "goldenRule": "Understand when AWS Lambda is preferred over alternative services for Compute workloads."
    },
    "bulletPoints": [
      "Category: Compute.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS Lambda: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/lambda/latest/userguide/what-is.html"
  },
  "svc-ecr": {
    "id": "svc-ecr",
    "serviceName": "Amazon ECR",
    "category": "Containers",
    "isImportant": true,
    "role": "In-scope Containers service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon ECR is a key AWS service in the Containers category. In the MLA-C02 exam, understanding how Amazon ECR integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon ECR (Containers) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon ECR: Master its role in the Containers domain.",
      "examTrap": "Confusing Amazon ECR with other Containers services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon ECR is preferred over alternative services for Containers workloads."
    },
    "bulletPoints": [
      "Category: Containers.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon ECR: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/ecr/latest/userguide/what-is.html"
  },
  "svc-ecs": {
    "id": "svc-ecs",
    "serviceName": "Amazon ECS",
    "category": "Containers",
    "isImportant": false,
    "role": "In-scope Containers service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon ECS is a key AWS service in the Containers category. In the MLA-C02 exam, understanding how Amazon ECS integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon ECS (Containers) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon ECS: Master its role in the Containers domain.",
      "examTrap": "Confusing Amazon ECS with other Containers services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon ECS is preferred over alternative services for Containers workloads."
    },
    "bulletPoints": [
      "Category: Containers.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon ECS: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/ecs/latest/userguide/what-is.html"
  },
  "svc-eks": {
    "id": "svc-eks",
    "serviceName": "Amazon EKS",
    "category": "Containers",
    "isImportant": false,
    "role": "In-scope Containers service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon EKS is a key AWS service in the Containers category. In the MLA-C02 exam, understanding how Amazon EKS integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon EKS (Containers) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon EKS: Master its role in the Containers domain.",
      "examTrap": "Confusing Amazon EKS with other Containers services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon EKS is preferred over alternative services for Containers workloads."
    },
    "bulletPoints": [
      "Category: Containers.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon EKS: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/eks/latest/userguide/what-is.html"
  },
  "svc-documentdb": {
    "id": "svc-documentdb",
    "serviceName": "Amazon DocumentDB",
    "category": "Database",
    "isImportant": false,
    "role": "In-scope Database service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon DocumentDB is a key AWS service in the Database category. In the MLA-C02 exam, understanding how Amazon DocumentDB integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon DocumentDB (Database) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon DocumentDB: Master its role in the Database domain.",
      "examTrap": "Confusing Amazon DocumentDB with other Database services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon DocumentDB is preferred over alternative services for Database workloads."
    },
    "bulletPoints": [
      "Category: Database.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon DocumentDB: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/documentdb/latest/userguide/what-is.html"
  },
  "svc-dynamodb": {
    "id": "svc-dynamodb",
    "serviceName": "Amazon DynamoDB",
    "category": "Database",
    "isImportant": true,
    "role": "In-scope Database service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon DynamoDB is a key AWS service in the Database category. In the MLA-C02 exam, understanding how Amazon DynamoDB integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon DynamoDB (Database) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon DynamoDB: Master its role in the Database domain.",
      "examTrap": "Confusing Amazon DynamoDB with other Database services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon DynamoDB is preferred over alternative services for Database workloads."
    },
    "bulletPoints": [
      "Category: Database.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon DynamoDB: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/dynamodb/latest/userguide/what-is.html"
  },
  "svc-elasticache": {
    "id": "svc-elasticache",
    "serviceName": "Amazon ElastiCache",
    "category": "Database",
    "isImportant": false,
    "role": "In-scope Database service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon ElastiCache is a key AWS service in the Database category. In the MLA-C02 exam, understanding how Amazon ElastiCache integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon ElastiCache (Database) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon ElastiCache: Master its role in the Database domain.",
      "examTrap": "Confusing Amazon ElastiCache with other Database services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon ElastiCache is preferred over alternative services for Database workloads."
    },
    "bulletPoints": [
      "Category: Database.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon ElastiCache: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/elasticache/latest/userguide/what-is.html"
  },
  "svc-neptune": {
    "id": "svc-neptune",
    "serviceName": "Amazon Neptune",
    "category": "Database",
    "isImportant": false,
    "role": "In-scope Database service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon Neptune is a key AWS service in the Database category. In the MLA-C02 exam, understanding how Amazon Neptune integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon Neptune (Database) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Neptune: Master its role in the Database domain.",
      "examTrap": "Confusing Amazon Neptune with other Database services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon Neptune is preferred over alternative services for Database workloads."
    },
    "bulletPoints": [
      "Category: Database.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon Neptune: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/neptune/latest/userguide/what-is.html"
  },
  "svc-rds": {
    "id": "svc-rds",
    "serviceName": "Amazon RDS",
    "category": "Database",
    "isImportant": true,
    "role": "In-scope Database service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon RDS is a key AWS service in the Database category. In the MLA-C02 exam, understanding how Amazon RDS integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon RDS (Database) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon RDS: Master its role in the Database domain.",
      "examTrap": "Confusing Amazon RDS with other Database services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon RDS is preferred over alternative services for Database workloads."
    },
    "bulletPoints": [
      "Category: Database.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon RDS: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/rds/latest/userguide/what-is.html"
  },
  "svc-cdk": {
    "id": "svc-cdk",
    "serviceName": "AWS CDK",
    "category": "Developer Tools",
    "isImportant": false,
    "role": "In-scope Developer Tools service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS CDK is a key AWS service in the Developer Tools category. In the MLA-C02 exam, understanding how AWS CDK integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS CDK (Developer Tools) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS CDK: Master its role in the Developer Tools domain.",
      "examTrap": "Confusing AWS CDK with other Developer Tools services in multiple-choice questions.",
      "goldenRule": "Understand when AWS CDK is preferred over alternative services for Developer Tools workloads."
    },
    "bulletPoints": [
      "Category: Developer Tools.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS CDK: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/cdk/latest/userguide/what-is.html"
  },
  "svc-codeartifact": {
    "id": "svc-codeartifact",
    "serviceName": "AWS CodeArtifact",
    "category": "Developer Tools",
    "isImportant": false,
    "role": "In-scope Developer Tools service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS CodeArtifact is a key AWS service in the Developer Tools category. In the MLA-C02 exam, understanding how AWS CodeArtifact integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS CodeArtifact (Developer Tools) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS CodeArtifact: Master its role in the Developer Tools domain.",
      "examTrap": "Confusing AWS CodeArtifact with other Developer Tools services in multiple-choice questions.",
      "goldenRule": "Understand when AWS CodeArtifact is preferred over alternative services for Developer Tools workloads."
    },
    "bulletPoints": [
      "Category: Developer Tools.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS CodeArtifact: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/codeartifact/latest/userguide/what-is.html"
  },
  "svc-codebuild": {
    "id": "svc-codebuild",
    "serviceName": "AWS CodeBuild",
    "category": "Developer Tools",
    "isImportant": true,
    "role": "In-scope Developer Tools service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS CodeBuild is a key AWS service in the Developer Tools category. In the MLA-C02 exam, understanding how AWS CodeBuild integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS CodeBuild (Developer Tools) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS CodeBuild: Master its role in the Developer Tools domain.",
      "examTrap": "Confusing AWS CodeBuild with other Developer Tools services in multiple-choice questions.",
      "goldenRule": "Understand when AWS CodeBuild is preferred over alternative services for Developer Tools workloads."
    },
    "bulletPoints": [
      "Category: Developer Tools.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS CodeBuild: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/codebuild/latest/userguide/what-is.html"
  },
  "svc-codecommit": {
    "id": "svc-codecommit",
    "serviceName": "AWS CodeCommit",
    "category": "Developer Tools",
    "isImportant": false,
    "role": "In-scope Developer Tools service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS CodeCommit is a key AWS service in the Developer Tools category. In the MLA-C02 exam, understanding how AWS CodeCommit integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS CodeCommit (Developer Tools) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS CodeCommit: Master its role in the Developer Tools domain.",
      "examTrap": "Confusing AWS CodeCommit with other Developer Tools services in multiple-choice questions.",
      "goldenRule": "Understand when AWS CodeCommit is preferred over alternative services for Developer Tools workloads."
    },
    "bulletPoints": [
      "Category: Developer Tools.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS CodeCommit: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/codecommit/latest/userguide/what-is.html"
  },
  "svc-codeconnections": {
    "id": "svc-codeconnections",
    "serviceName": "AWS CodeConnections",
    "category": "Developer Tools",
    "isImportant": false,
    "role": "In-scope Developer Tools service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS CodeConnections is a key AWS service in the Developer Tools category. In the MLA-C02 exam, understanding how AWS CodeConnections integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS CodeConnections (Developer Tools) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS CodeConnections: Master its role in the Developer Tools domain.",
      "examTrap": "Confusing AWS CodeConnections with other Developer Tools services in multiple-choice questions.",
      "goldenRule": "Understand when AWS CodeConnections is preferred over alternative services for Developer Tools workloads."
    },
    "bulletPoints": [
      "Category: Developer Tools.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS CodeConnections: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/codeconnections/latest/userguide/what-is.html"
  },
  "svc-codedeploy": {
    "id": "svc-codedeploy",
    "serviceName": "AWS CodeDeploy",
    "category": "Developer Tools",
    "isImportant": false,
    "role": "In-scope Developer Tools service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS CodeDeploy is a key AWS service in the Developer Tools category. In the MLA-C02 exam, understanding how AWS CodeDeploy integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS CodeDeploy (Developer Tools) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS CodeDeploy: Master its role in the Developer Tools domain.",
      "examTrap": "Confusing AWS CodeDeploy with other Developer Tools services in multiple-choice questions.",
      "goldenRule": "Understand when AWS CodeDeploy is preferred over alternative services for Developer Tools workloads."
    },
    "bulletPoints": [
      "Category: Developer Tools.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS CodeDeploy: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/codedeploy/latest/userguide/what-is.html"
  },
  "svc-codepipeline": {
    "id": "svc-codepipeline",
    "serviceName": "AWS CodePipeline",
    "category": "Developer Tools",
    "isImportant": true,
    "role": "In-scope Developer Tools service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS CodePipeline is a key AWS service in the Developer Tools category. In the MLA-C02 exam, understanding how AWS CodePipeline integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS CodePipeline (Developer Tools) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS CodePipeline: Master its role in the Developer Tools domain.",
      "examTrap": "Confusing AWS CodePipeline with other Developer Tools services in multiple-choice questions.",
      "goldenRule": "Understand when AWS CodePipeline is preferred over alternative services for Developer Tools workloads."
    },
    "bulletPoints": [
      "Category: Developer Tools.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS CodePipeline: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/codepipeline/latest/userguide/what-is.html"
  },
  "svc-xray": {
    "id": "svc-xray",
    "serviceName": "AWS X-Ray",
    "category": "Developer Tools",
    "isImportant": false,
    "role": "In-scope Developer Tools service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS X-Ray is a key AWS service in the Developer Tools category. In the MLA-C02 exam, understanding how AWS X-Ray integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS X-Ray (Developer Tools) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS X-Ray: Master its role in the Developer Tools domain.",
      "examTrap": "Confusing AWS X-Ray with other Developer Tools services in multiple-choice questions.",
      "goldenRule": "Understand when AWS X-Ray is preferred over alternative services for Developer Tools workloads."
    },
    "bulletPoints": [
      "Category: Developer Tools.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS X-Ray: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/xray/latest/userguide/what-is.html"
  },
  "svc-bedrock": {
    "id": "svc-bedrock",
    "serviceName": "Amazon Bedrock",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": true,
    "role": "Fully managed serverless Generative AI service offering high-performance Foundation Models (Claude, Titan, Llama, Mistral) via a single unified API.",
    "plainEnglish": "Amazon Bedrock is the easiest way to build Generative AI applications without managing a single GPU. It gives you a single API to access top foundation models from Anthropic (Claude), Meta (Llama), Amazon (Titan), and Cohere, plus built-in Knowledge Bases for RAG and Agents for taking autonomous actions.",
    "diagram": "  [ Client App ] \u2500\u2500(InvokeModel API)\u2500\u2500> \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n                                        \u2502 Amazon Bedrock                       \u2502\n                                        \u2502 \u2022 Anthropic Claude 3.5 (Reasoning)   \u2502\n                                        \u2502 \u2022 Amazon Titan (Embeddings/Text)     \u2502\n                                        \u2502 \u2022 Knowledge Bases (Managed RAG)      \u2502\n                                        \u2502 \u2022 Guardrails (PII & Prompt Defense)  \u2502\n                                        \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518",
    "handwrittenNotes": {
      "mnemonic": "Bedrock = Serverless Generative AI API gateway with zero GPU headaches.",
      "examTrap": "Launching EC2 GPU instances to run open-source Llama or Mistral when Bedrock offers them fully serverless with built-in autoscaling and security.",
      "goldenRule": "For Generative AI and Foundation Models, Amazon Bedrock is the first-choice AWS service."
    },
    "bulletPoints": [
      "Serverless on-demand pricing charges per 1,000 input and output tokens.",
      "Provisioned Throughput guarantees consistent transaction-per-second (TPS) capacity via 1-month or 6-month commitments.",
      "Knowledge Bases automatically chunk, embed, and store documents in vector databases for RAG.",
      "Guardrails enforce PII masking, toxic content filtration, and prompt injection defense."
    ],
    "scenarioTip": "A company wants to add enterprise chat over internal PDF policies with zero server management: Choose Amazon Bedrock Knowledge Bases with Anthropic Claude.",
    "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html"
  },
  "svc-bedrock-agentcore": {
    "id": "svc-bedrock-agentcore",
    "serviceName": "Amazon Bedrock AgentCore",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": true,
    "role": "In-scope Machine Learning and Artificial Intelligence service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon Bedrock AgentCore is a key AWS service in the Machine Learning and Artificial Intelligence category. In the MLA-C02 exam, understanding how Amazon Bedrock AgentCore integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon Bedrock AgentCore (Machine Learning and Artificial Intelligence) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Bedrock AgentCore: Master its role in the Machine Learning and Artificial Intelligence domain.",
      "examTrap": "Confusing Amazon Bedrock AgentCore with other Machine Learning and Artificial Intelligence services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon Bedrock AgentCore is preferred over alternative services for Machine Learning and Artificial Intelligence workloads."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon Bedrock AgentCore: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html"
  },
  "svc-codeguru": {
    "id": "svc-codeguru",
    "serviceName": "Amazon CodeGuru",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": false,
    "role": "In-scope Machine Learning and Artificial Intelligence service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon CodeGuru is a key AWS service in the Machine Learning and Artificial Intelligence category. In the MLA-C02 exam, understanding how Amazon CodeGuru integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon CodeGuru (Machine Learning and Artificial Intelligence) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon CodeGuru: Master its role in the Machine Learning and Artificial Intelligence domain.",
      "examTrap": "Confusing Amazon CodeGuru with other Machine Learning and Artificial Intelligence services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon CodeGuru is preferred over alternative services for Machine Learning and Artificial Intelligence workloads."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon CodeGuru: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/codeguru/latest/userguide/what-is.html"
  },
  "svc-comprehend": {
    "id": "svc-comprehend",
    "serviceName": "Amazon Comprehend",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": true,
    "role": "In-scope Machine Learning and Artificial Intelligence service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon Comprehend is a key AWS service in the Machine Learning and Artificial Intelligence category. In the MLA-C02 exam, understanding how Amazon Comprehend integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon Comprehend (Machine Learning and Artificial Intelligence) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Comprehend: Master its role in the Machine Learning and Artificial Intelligence domain.",
      "examTrap": "Confusing Amazon Comprehend with other Machine Learning and Artificial Intelligence services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon Comprehend is preferred over alternative services for Machine Learning and Artificial Intelligence workloads."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon Comprehend: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/comprehend/latest/userguide/what-is.html"
  },
  "svc-comprehend-medical": {
    "id": "svc-comprehend-medical",
    "serviceName": "Amazon Comprehend Medical",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": false,
    "role": "In-scope Machine Learning and Artificial Intelligence service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon Comprehend Medical is a key AWS service in the Machine Learning and Artificial Intelligence category. In the MLA-C02 exam, understanding how Amazon Comprehend Medical integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon Comprehend Medical (Machine Learning and Artificial Intelligence) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Comprehend Medical: Master its role in the Machine Learning and Artificial Intelligence domain.",
      "examTrap": "Confusing Amazon Comprehend Medical with other Machine Learning and Artificial Intelligence services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon Comprehend Medical is preferred over alternative services for Machine Learning and Artificial Intelligence workloads."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon Comprehend Medical: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/comprehendmedical/latest/userguide/what-is.html"
  },
  "svc-devops-guru": {
    "id": "svc-devops-guru",
    "serviceName": "Amazon DevOps Guru",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": false,
    "role": "In-scope Machine Learning and Artificial Intelligence service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon DevOps Guru is a key AWS service in the Machine Learning and Artificial Intelligence category. In the MLA-C02 exam, understanding how Amazon DevOps Guru integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon DevOps Guru (Machine Learning and Artificial Intelligence) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon DevOps Guru: Master its role in the Machine Learning and Artificial Intelligence domain.",
      "examTrap": "Confusing Amazon DevOps Guru with other Machine Learning and Artificial Intelligence services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon DevOps Guru is preferred over alternative services for Machine Learning and Artificial Intelligence workloads."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon DevOps Guru: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/devopsguru/latest/userguide/what-is.html"
  },
  "svc-healthlake": {
    "id": "svc-healthlake",
    "serviceName": "AWS HealthLake",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": false,
    "role": "In-scope Machine Learning and Artificial Intelligence service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS HealthLake is a key AWS service in the Machine Learning and Artificial Intelligence category. In the MLA-C02 exam, understanding how AWS HealthLake integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS HealthLake (Machine Learning and Artificial Intelligence) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS HealthLake: Master its role in the Machine Learning and Artificial Intelligence domain.",
      "examTrap": "Confusing AWS HealthLake with other Machine Learning and Artificial Intelligence services in multiple-choice questions.",
      "goldenRule": "Understand when AWS HealthLake is preferred over alternative services for Machine Learning and Artificial Intelligence workloads."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS HealthLake: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/healthlake/latest/userguide/what-is.html"
  },
  "svc-lex": {
    "id": "svc-lex",
    "serviceName": "Amazon Lex",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": false,
    "role": "In-scope Machine Learning and Artificial Intelligence service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon Lex is a key AWS service in the Machine Learning and Artificial Intelligence category. In the MLA-C02 exam, understanding how Amazon Lex integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon Lex (Machine Learning and Artificial Intelligence) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Lex: Master its role in the Machine Learning and Artificial Intelligence domain.",
      "examTrap": "Confusing Amazon Lex with other Machine Learning and Artificial Intelligence services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon Lex is preferred over alternative services for Machine Learning and Artificial Intelligence workloads."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon Lex: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/lex/latest/userguide/what-is.html"
  },
  "svc-personalize": {
    "id": "svc-personalize",
    "serviceName": "Amazon Personalize",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": false,
    "role": "In-scope Machine Learning and Artificial Intelligence service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon Personalize is a key AWS service in the Machine Learning and Artificial Intelligence category. In the MLA-C02 exam, understanding how Amazon Personalize integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon Personalize (Machine Learning and Artificial Intelligence) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Personalize: Master its role in the Machine Learning and Artificial Intelligence domain.",
      "examTrap": "Confusing Amazon Personalize with other Machine Learning and Artificial Intelligence services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon Personalize is preferred over alternative services for Machine Learning and Artificial Intelligence workloads."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon Personalize: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/personalize/latest/userguide/what-is.html"
  },
  "svc-polly": {
    "id": "svc-polly",
    "serviceName": "Amazon Polly",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": false,
    "role": "In-scope Machine Learning and Artificial Intelligence service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon Polly is a key AWS service in the Machine Learning and Artificial Intelligence category. In the MLA-C02 exam, understanding how Amazon Polly integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon Polly (Machine Learning and Artificial Intelligence) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Polly: Master its role in the Machine Learning and Artificial Intelligence domain.",
      "examTrap": "Confusing Amazon Polly with other Machine Learning and Artificial Intelligence services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon Polly is preferred over alternative services for Machine Learning and Artificial Intelligence workloads."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon Polly: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/polly/latest/userguide/what-is.html"
  },
  "svc-rekognition": {
    "id": "svc-rekognition",
    "serviceName": "Amazon Rekognition",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": true,
    "role": "In-scope Machine Learning and Artificial Intelligence service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon Rekognition is a key AWS service in the Machine Learning and Artificial Intelligence category. In the MLA-C02 exam, understanding how Amazon Rekognition integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon Rekognition (Machine Learning and Artificial Intelligence) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Rekognition: Master its role in the Machine Learning and Artificial Intelligence domain.",
      "examTrap": "Confusing Amazon Rekognition with other Machine Learning and Artificial Intelligence services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon Rekognition is preferred over alternative services for Machine Learning and Artificial Intelligence workloads."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon Rekognition: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/rekognition/latest/userguide/what-is.html"
  },
  "svc-sagemaker": {
    "id": "svc-sagemaker",
    "serviceName": "Amazon SageMaker AI",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": true,
    "role": "Primary end-to-end ML platform: studio, script mode training, real-time/serverless/async endpoints, pipelines, and model monitor.",
    "plainEnglish": "SageMaker is AWS's complete powerhouse for building, training, tuning, deploying, and monitoring machine learning models. Instead of managing your own GPU drivers and servers, SageMaker handles everything from interactive JupyterLab notebooks to distributed cluster training and auto-scaling production endpoints.",
    "diagram": "  [ S3 Training Data ] \u2500\u2500> [ SageMaker Training Cluster ] \u2500\u2500> [ S3 Model Artifacts ]\n                                      \u2502                                      \u2502\n                                      \u25bc                                      \u25bc\n                              [ Model Registry ] \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500> [ SageMaker Endpoint ]",
    "handwrittenNotes": {
      "mnemonic": "SageMaker = The all-in-one AWS factory for Machine Learning.",
      "examTrap": "Thinking SageMaker requires you to rewrite all code in proprietary libraries. Script Mode lets you run raw PyTorch, TensorFlow, or Scikit-learn with zero changes.",
      "goldenRule": "Use SageMaker for custom classical ML, distributed training, and managed multi-model endpoints."
    },
    "bulletPoints": [
      "Script Mode runs user Python scripts inside pre-built AWS Deep Learning Containers.",
      "Model Monitor detects data drift, concept drift, bias drift, and feature attribution drift in production.",
      "Supports 4 inference types: Real-Time (<6MB/60s), Serverless, Asynchronous (1GB/1hr), and Batch Transform.",
      "Feature Store provides sub-10ms online reads and historical offline S3 time-travel queries."
    ],
    "scenarioTip": "Scenario asks for managed model training on PyTorch with automated hyperparameter optimization: Choose SageMaker Automatic Model Tuning (AMT) with PyTorch Estimator.",
    "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html"
  },
  "svc-textract": {
    "id": "svc-textract",
    "serviceName": "Amazon Textract",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": true,
    "role": "In-scope Machine Learning and Artificial Intelligence service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon Textract is a key AWS service in the Machine Learning and Artificial Intelligence category. In the MLA-C02 exam, understanding how Amazon Textract integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon Textract (Machine Learning and Artificial Intelligence) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Textract: Master its role in the Machine Learning and Artificial Intelligence domain.",
      "examTrap": "Confusing Amazon Textract with other Machine Learning and Artificial Intelligence services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon Textract is preferred over alternative services for Machine Learning and Artificial Intelligence workloads."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon Textract: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/textract/latest/userguide/what-is.html"
  },
  "svc-transcribe": {
    "id": "svc-transcribe",
    "serviceName": "Amazon Transcribe",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": false,
    "role": "In-scope Machine Learning and Artificial Intelligence service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon Transcribe is a key AWS service in the Machine Learning and Artificial Intelligence category. In the MLA-C02 exam, understanding how Amazon Transcribe integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon Transcribe (Machine Learning and Artificial Intelligence) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Transcribe: Master its role in the Machine Learning and Artificial Intelligence domain.",
      "examTrap": "Confusing Amazon Transcribe with other Machine Learning and Artificial Intelligence services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon Transcribe is preferred over alternative services for Machine Learning and Artificial Intelligence workloads."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon Transcribe: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/transcribe/latest/userguide/what-is.html"
  },
  "svc-translate": {
    "id": "svc-translate",
    "serviceName": "Amazon Translate",
    "category": "Machine Learning and Artificial Intelligence",
    "isImportant": false,
    "role": "In-scope Machine Learning and Artificial Intelligence service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon Translate is a key AWS service in the Machine Learning and Artificial Intelligence category. In the MLA-C02 exam, understanding how Amazon Translate integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon Translate (Machine Learning and Artificial Intelligence) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Translate: Master its role in the Machine Learning and Artificial Intelligence domain.",
      "examTrap": "Confusing Amazon Translate with other Machine Learning and Artificial Intelligence services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon Translate is preferred over alternative services for Machine Learning and Artificial Intelligence workloads."
    },
    "bulletPoints": [
      "Category: Machine Learning and Artificial Intelligence.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon Translate: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/translate/latest/userguide/what-is.html"
  },
  "svc-auto-scaling": {
    "id": "svc-auto-scaling",
    "serviceName": "AWS Auto Scaling",
    "category": "Management and Governance",
    "isImportant": false,
    "role": "In-scope Management and Governance service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS Auto Scaling is a key AWS service in the Management and Governance category. In the MLA-C02 exam, understanding how AWS Auto Scaling integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS Auto Scaling (Management and Governance) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Auto Scaling: Master its role in the Management and Governance domain.",
      "examTrap": "Confusing AWS Auto Scaling with other Management and Governance services in multiple-choice questions.",
      "goldenRule": "Understand when AWS Auto Scaling is preferred over alternative services for Management and Governance workloads."
    },
    "bulletPoints": [
      "Category: Management and Governance.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS Auto Scaling: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/autoscaling/latest/userguide/what-is.html"
  },
  "svc-cloudformation": {
    "id": "svc-cloudformation",
    "serviceName": "AWS CloudFormation",
    "category": "Management and Governance",
    "isImportant": false,
    "role": "In-scope Management and Governance service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS CloudFormation is a key AWS service in the Management and Governance category. In the MLA-C02 exam, understanding how AWS CloudFormation integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS CloudFormation (Management and Governance) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS CloudFormation: Master its role in the Management and Governance domain.",
      "examTrap": "Confusing AWS CloudFormation with other Management and Governance services in multiple-choice questions.",
      "goldenRule": "Understand when AWS CloudFormation is preferred over alternative services for Management and Governance workloads."
    },
    "bulletPoints": [
      "Category: Management and Governance.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS CloudFormation: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/cloudformation/latest/userguide/what-is.html"
  },
  "svc-cloudtrail": {
    "id": "svc-cloudtrail",
    "serviceName": "AWS CloudTrail",
    "category": "Management and Governance",
    "isImportant": true,
    "role": "In-scope Management and Governance service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS CloudTrail is a key AWS service in the Management and Governance category. In the MLA-C02 exam, understanding how AWS CloudTrail integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS CloudTrail (Management and Governance) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS CloudTrail: Master its role in the Management and Governance domain.",
      "examTrap": "Confusing AWS CloudTrail with other Management and Governance services in multiple-choice questions.",
      "goldenRule": "Understand when AWS CloudTrail is preferred over alternative services for Management and Governance workloads."
    },
    "bulletPoints": [
      "Category: Management and Governance.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS CloudTrail: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/cloudtrail/latest/userguide/what-is.html"
  },
  "svc-cloudwatch": {
    "id": "svc-cloudwatch",
    "serviceName": "Amazon CloudWatch",
    "category": "Management and Governance",
    "isImportant": true,
    "role": "In-scope Management and Governance service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon CloudWatch is a key AWS service in the Management and Governance category. In the MLA-C02 exam, understanding how Amazon CloudWatch integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon CloudWatch (Management and Governance) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon CloudWatch: Master its role in the Management and Governance domain.",
      "examTrap": "Confusing Amazon CloudWatch with other Management and Governance services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon CloudWatch is preferred over alternative services for Management and Governance workloads."
    },
    "bulletPoints": [
      "Category: Management and Governance.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon CloudWatch: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/cloudwatch/latest/userguide/what-is.html"
  },
  "svc-compute-optimizer": {
    "id": "svc-compute-optimizer",
    "serviceName": "AWS Compute Optimizer",
    "category": "Management and Governance",
    "isImportant": false,
    "role": "In-scope Management and Governance service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS Compute Optimizer is a key AWS service in the Management and Governance category. In the MLA-C02 exam, understanding how AWS Compute Optimizer integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS Compute Optimizer (Management and Governance) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Compute Optimizer: Master its role in the Management and Governance domain.",
      "examTrap": "Confusing AWS Compute Optimizer with other Management and Governance services in multiple-choice questions.",
      "goldenRule": "Understand when AWS Compute Optimizer is preferred over alternative services for Management and Governance workloads."
    },
    "bulletPoints": [
      "Category: Management and Governance.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS Compute Optimizer: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/computeoptimizer/latest/userguide/what-is.html"
  },
  "svc-config": {
    "id": "svc-config",
    "serviceName": "AWS Config",
    "category": "Management and Governance",
    "isImportant": true,
    "role": "In-scope Management and Governance service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS Config is a key AWS service in the Management and Governance category. In the MLA-C02 exam, understanding how AWS Config integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS Config (Management and Governance) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Config: Master its role in the Management and Governance domain.",
      "examTrap": "Confusing AWS Config with other Management and Governance services in multiple-choice questions.",
      "goldenRule": "Understand when AWS Config is preferred over alternative services for Management and Governance workloads."
    },
    "bulletPoints": [
      "Category: Management and Governance.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS Config: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/config/latest/userguide/what-is.html"
  },
  "svc-organizations": {
    "id": "svc-organizations",
    "serviceName": "AWS Organizations",
    "category": "Management and Governance",
    "isImportant": false,
    "role": "In-scope Management and Governance service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS Organizations is a key AWS service in the Management and Governance category. In the MLA-C02 exam, understanding how AWS Organizations integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS Organizations (Management and Governance) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Organizations: Master its role in the Management and Governance domain.",
      "examTrap": "Confusing AWS Organizations with other Management and Governance services in multiple-choice questions.",
      "goldenRule": "Understand when AWS Organizations is preferred over alternative services for Management and Governance workloads."
    },
    "bulletPoints": [
      "Category: Management and Governance.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS Organizations: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/organizations/latest/userguide/what-is.html"
  },
  "svc-service-catalog": {
    "id": "svc-service-catalog",
    "serviceName": "AWS Service Catalog",
    "category": "Management and Governance",
    "isImportant": false,
    "role": "In-scope Management and Governance service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS Service Catalog is a key AWS service in the Management and Governance category. In the MLA-C02 exam, understanding how AWS Service Catalog integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS Service Catalog (Management and Governance) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Service Catalog: Master its role in the Management and Governance domain.",
      "examTrap": "Confusing AWS Service Catalog with other Management and Governance services in multiple-choice questions.",
      "goldenRule": "Understand when AWS Service Catalog is preferred over alternative services for Management and Governance workloads."
    },
    "bulletPoints": [
      "Category: Management and Governance.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS Service Catalog: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/servicecatalog/latest/userguide/what-is.html"
  },
  "svc-systems-manager": {
    "id": "svc-systems-manager",
    "serviceName": "AWS Systems Manager",
    "category": "Management and Governance",
    "isImportant": false,
    "role": "In-scope Management and Governance service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS Systems Manager is a key AWS service in the Management and Governance category. In the MLA-C02 exam, understanding how AWS Systems Manager integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS Systems Manager (Management and Governance) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Systems Manager: Master its role in the Management and Governance domain.",
      "examTrap": "Confusing AWS Systems Manager with other Management and Governance services in multiple-choice questions.",
      "goldenRule": "Understand when AWS Systems Manager is preferred over alternative services for Management and Governance workloads."
    },
    "bulletPoints": [
      "Category: Management and Governance.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS Systems Manager: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/systemsmanager/latest/userguide/what-is.html"
  },
  "svc-trusted-advisor": {
    "id": "svc-trusted-advisor",
    "serviceName": "AWS Trusted Advisor",
    "category": "Management and Governance",
    "isImportant": false,
    "role": "In-scope Management and Governance service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS Trusted Advisor is a key AWS service in the Management and Governance category. In the MLA-C02 exam, understanding how AWS Trusted Advisor integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS Trusted Advisor (Management and Governance) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Trusted Advisor: Master its role in the Management and Governance domain.",
      "examTrap": "Confusing AWS Trusted Advisor with other Management and Governance services in multiple-choice questions.",
      "goldenRule": "Understand when AWS Trusted Advisor is preferred over alternative services for Management and Governance workloads."
    },
    "bulletPoints": [
      "Category: Management and Governance.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS Trusted Advisor: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/trustedadvisor/latest/userguide/what-is.html"
  },
  "svc-kinesis-video-streams": {
    "id": "svc-kinesis-video-streams",
    "serviceName": "Amazon Kinesis Video Streams",
    "category": "Media",
    "isImportant": false,
    "role": "In-scope Media service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon Kinesis Video Streams is a key AWS service in the Media category. In the MLA-C02 exam, understanding how Amazon Kinesis Video Streams integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon Kinesis Video Streams (Media) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Kinesis Video Streams: Master its role in the Media domain.",
      "examTrap": "Confusing Amazon Kinesis Video Streams with other Media services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon Kinesis Video Streams is preferred over alternative services for Media workloads."
    },
    "bulletPoints": [
      "Category: Media.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon Kinesis Video Streams: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/kinesisvideostreams/latest/userguide/what-is.html"
  },
  "svc-datasync": {
    "id": "svc-datasync",
    "serviceName": "AWS DataSync",
    "category": "Migration and Transfer",
    "isImportant": false,
    "role": "In-scope Migration and Transfer service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS DataSync is a key AWS service in the Migration and Transfer category. In the MLA-C02 exam, understanding how AWS DataSync integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS DataSync (Migration and Transfer) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS DataSync: Master its role in the Migration and Transfer domain.",
      "examTrap": "Confusing AWS DataSync with other Migration and Transfer services in multiple-choice questions.",
      "goldenRule": "Understand when AWS DataSync is preferred over alternative services for Migration and Transfer workloads."
    },
    "bulletPoints": [
      "Category: Migration and Transfer.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS DataSync: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/datasync/latest/userguide/what-is.html"
  },
  "svc-api-gateway": {
    "id": "svc-api-gateway",
    "serviceName": "Amazon API Gateway",
    "category": "Networking and Content Delivery",
    "isImportant": false,
    "role": "In-scope Networking and Content Delivery service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon API Gateway is a key AWS service in the Networking and Content Delivery category. In the MLA-C02 exam, understanding how Amazon API Gateway integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon API Gateway (Networking and Content Delivery) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon API Gateway: Master its role in the Networking and Content Delivery domain.",
      "examTrap": "Confusing Amazon API Gateway with other Networking and Content Delivery services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon API Gateway is preferred over alternative services for Networking and Content Delivery workloads."
    },
    "bulletPoints": [
      "Category: Networking and Content Delivery.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon API Gateway: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/apigateway/latest/userguide/what-is.html"
  },
  "svc-cloudfront": {
    "id": "svc-cloudfront",
    "serviceName": "Amazon CloudFront",
    "category": "Networking and Content Delivery",
    "isImportant": false,
    "role": "In-scope Networking and Content Delivery service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon CloudFront is a key AWS service in the Networking and Content Delivery category. In the MLA-C02 exam, understanding how Amazon CloudFront integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon CloudFront (Networking and Content Delivery) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon CloudFront: Master its role in the Networking and Content Delivery domain.",
      "examTrap": "Confusing Amazon CloudFront with other Networking and Content Delivery services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon CloudFront is preferred over alternative services for Networking and Content Delivery workloads."
    },
    "bulletPoints": [
      "Category: Networking and Content Delivery.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon CloudFront: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/cloudfront/latest/userguide/what-is.html"
  },
  "svc-direct-connect": {
    "id": "svc-direct-connect",
    "serviceName": "AWS Direct Connect",
    "category": "Networking and Content Delivery",
    "isImportant": false,
    "role": "In-scope Networking and Content Delivery service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS Direct Connect is a key AWS service in the Networking and Content Delivery category. In the MLA-C02 exam, understanding how AWS Direct Connect integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS Direct Connect (Networking and Content Delivery) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Direct Connect: Master its role in the Networking and Content Delivery domain.",
      "examTrap": "Confusing AWS Direct Connect with other Networking and Content Delivery services in multiple-choice questions.",
      "goldenRule": "Understand when AWS Direct Connect is preferred over alternative services for Networking and Content Delivery workloads."
    },
    "bulletPoints": [
      "Category: Networking and Content Delivery.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS Direct Connect: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/directconnect/latest/userguide/what-is.html"
  },
  "svc-vpc": {
    "id": "svc-vpc",
    "serviceName": "Amazon VPC",
    "category": "Networking and Content Delivery",
    "isImportant": true,
    "role": "Isolated private network infrastructure: private subnets, security groups, and VPC Endpoints (AWS PrivateLink) for secure ML workloads.",
    "plainEnglish": "Amazon Virtual Private Cloud (VPC) lets you run SageMaker notebooks, training clusters, and inference endpoints inside an isolated private network without exposing traffic to the public internet.",
    "diagram": "  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n  \u2502 Corporate Private VPC (No Internet Gateway)                  \u2502\n  \u2502                                                              \u2502\n  \u2502  [ SageMaker Studio / Endpoints ]                            \u2502\n  \u2502            \u2502                                                 \u2502\n  \u2502            \u25bc                                                 \u2502\n  \u2502  [ VPC Interface Endpoint (PrivateLink) ] \u2500\u2500> S3 / KMS APIs  \u2502\n  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518",
    "handwrittenNotes": {
      "mnemonic": "VPC = Private security fence around your models and data.",
      "examTrap": "Routing training data over public internet IPs. Use VPC Interface Endpoints and S3 Gateway Endpoints for direct, private data transfers.",
      "goldenRule": "Deploy SageMaker resources in private subnets with VPC endpoints and enable `EnableNetworkIsolation=True`."
    },
    "bulletPoints": [
      "Gateway VPC Endpoints provide free, private connectivity to Amazon S3 and DynamoDB.",
      "Interface VPC Endpoints (PrivateLink) provide private connectivity to SageMaker API, SageMaker Runtime, and Bedrock.",
      "Security Groups act as virtual firewalls controlling inbound and outbound instance traffic."
    ],
    "scenarioTip": "Security requirement specifies that ML training data must never traverse the public internet: Deploy SageMaker in a private subnet with an S3 VPC Gateway Endpoint.",
    "url": "https://docs.aws.amazon.com/vpc/latest/userguide/what-is.html"
  },
  "svc-iam": {
    "id": "svc-iam",
    "serviceName": "IAM",
    "category": "Security, Identity, and Compliance",
    "isImportant": true,
    "role": "In-scope Security, Identity, and Compliance service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "IAM is a key AWS service in the Security, Identity, and Compliance category. In the MLA-C02 exam, understanding how IAM integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ IAM (Security, Identity, and Compliance) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "IAM: Master its role in the Security, Identity, and Compliance domain.",
      "examTrap": "Confusing IAM with other Security, Identity, and Compliance services in multiple-choice questions.",
      "goldenRule": "Understand when IAM is preferred over alternative services for Security, Identity, and Compliance workloads."
    },
    "bulletPoints": [
      "Category: Security, Identity, and Compliance.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving IAM: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/iam/latest/userguide/what-is.html"
  },
  "svc-inspector": {
    "id": "svc-inspector",
    "serviceName": "Amazon Inspector",
    "category": "Security, Identity, and Compliance",
    "isImportant": false,
    "role": "In-scope Security, Identity, and Compliance service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon Inspector is a key AWS service in the Security, Identity, and Compliance category. In the MLA-C02 exam, understanding how Amazon Inspector integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon Inspector (Security, Identity, and Compliance) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Inspector: Master its role in the Security, Identity, and Compliance domain.",
      "examTrap": "Confusing Amazon Inspector with other Security, Identity, and Compliance services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon Inspector is preferred over alternative services for Security, Identity, and Compliance workloads."
    },
    "bulletPoints": [
      "Category: Security, Identity, and Compliance.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon Inspector: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/inspector/latest/userguide/what-is.html"
  },
  "svc-kms": {
    "id": "svc-kms",
    "serviceName": "AWS KMS",
    "category": "Security, Identity, and Compliance",
    "isImportant": true,
    "role": "Cryptographic service for managing encryption keys (CMKs) across S3 data, EBS volumes, ECR images, and SageMaker models.",
    "plainEnglish": "AWS Key Management Service (KMS) protects all your ML data at rest. You create Customer Managed Keys (CMKs) that give you full control over key rotation and IAM access policies.",
    "diagram": "  [ Data Ingestion / S3 ] \u2500\u2500(KMS CMK Encrypt)\u2500\u2500> [ S3 Encrypted at Rest ]\n                                                       \u2502\n                                                       \u25bc\n  [ SageMaker Training Job ] <\u2500\u2500(kms:Decrypt via Role)\u2500\u2518",
    "handwrittenNotes": {
      "mnemonic": "KMS = The master keyholder for data encryption across all ML pipelines.",
      "examTrap": "Forgetting to grant `kms:Decrypt` permission to the SageMaker execution role. If the S3 bucket is encrypted with a KMS CMK, the role will fail with Access Denied!",
      "goldenRule": "SageMaker execution roles need explicit `kms:Decrypt` and `kms:GenerateDataKey` permissions for CMK-encrypted buckets."
    },
    "bulletPoints": [
      "Envelope encryption protects data with data keys, which are encrypted under root KMS CMKs.",
      "Inter-container traffic encryption can be enabled on SageMaker Estimators with `EnableInterContainerTrafficEncryption=True`.",
      "KMS key policies determine which AWS roles and accounts are permitted to use the key."
    ],
    "scenarioTip": "SageMaker training job fails to read S3 data despite having `s3:GetObject` permission: Check if S3 bucket uses a KMS CMK and ensure the role has `kms:Decrypt` permission.",
    "url": "https://docs.aws.amazon.com/kms/latest/userguide/what-is.html"
  },
  "svc-macie": {
    "id": "svc-macie",
    "serviceName": "Amazon Macie",
    "category": "Security, Identity, and Compliance",
    "isImportant": false,
    "role": "In-scope Security, Identity, and Compliance service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon Macie is a key AWS service in the Security, Identity, and Compliance category. In the MLA-C02 exam, understanding how Amazon Macie integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon Macie (Security, Identity, and Compliance) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon Macie: Master its role in the Security, Identity, and Compliance domain.",
      "examTrap": "Confusing Amazon Macie with other Security, Identity, and Compliance services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon Macie is preferred over alternative services for Security, Identity, and Compliance workloads."
    },
    "bulletPoints": [
      "Category: Security, Identity, and Compliance.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon Macie: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/macie/latest/userguide/what-is.html"
  },
  "svc-secrets-manager": {
    "id": "svc-secrets-manager",
    "serviceName": "AWS Secrets Manager",
    "category": "Security, Identity, and Compliance",
    "isImportant": false,
    "role": "In-scope Security, Identity, and Compliance service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS Secrets Manager is a key AWS service in the Security, Identity, and Compliance category. In the MLA-C02 exam, understanding how AWS Secrets Manager integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS Secrets Manager (Security, Identity, and Compliance) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Secrets Manager: Master its role in the Security, Identity, and Compliance domain.",
      "examTrap": "Confusing AWS Secrets Manager with other Security, Identity, and Compliance services in multiple-choice questions.",
      "goldenRule": "Understand when AWS Secrets Manager is preferred over alternative services for Security, Identity, and Compliance workloads."
    },
    "bulletPoints": [
      "Category: Security, Identity, and Compliance.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS Secrets Manager: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/secretsmanager/latest/userguide/what-is.html"
  },
  "svc-ebs": {
    "id": "svc-ebs",
    "serviceName": "Amazon EBS",
    "category": "Storage",
    "isImportant": true,
    "role": "In-scope Storage service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon EBS is a key AWS service in the Storage category. In the MLA-C02 exam, understanding how Amazon EBS integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon EBS (Storage) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon EBS: Master its role in the Storage domain.",
      "examTrap": "Confusing Amazon EBS with other Storage services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon EBS is preferred over alternative services for Storage workloads."
    },
    "bulletPoints": [
      "Category: Storage.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon EBS: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/ebs/latest/userguide/what-is.html"
  },
  "svc-efs": {
    "id": "svc-efs",
    "serviceName": "Amazon EFS",
    "category": "Storage",
    "isImportant": true,
    "role": "In-scope Storage service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon EFS is a key AWS service in the Storage category. In the MLA-C02 exam, understanding how Amazon EFS integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon EFS (Storage) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon EFS: Master its role in the Storage domain.",
      "examTrap": "Confusing Amazon EFS with other Storage services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon EFS is preferred over alternative services for Storage workloads."
    },
    "bulletPoints": [
      "Category: Storage.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon EFS: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/efs/latest/userguide/what-is.html"
  },
  "svc-fsx": {
    "id": "svc-fsx",
    "serviceName": "Amazon FSx",
    "category": "Storage",
    "isImportant": true,
    "role": "In-scope Storage service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon FSx is a key AWS service in the Storage category. In the MLA-C02 exam, understanding how Amazon FSx integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon FSx (Storage) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon FSx: Master its role in the Storage domain.",
      "examTrap": "Confusing Amazon FSx with other Storage services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon FSx is preferred over alternative services for Storage workloads."
    },
    "bulletPoints": [
      "Category: Storage.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon FSx: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/fsx/latest/userguide/what-is.html"
  },
  "svc-s3": {
    "id": "svc-s3",
    "serviceName": "Amazon S3",
    "category": "Storage",
    "isImportant": true,
    "role": "Object storage foundation for ML data lakes, model artifacts, checkpointing, and feature store offline storage.",
    "plainEnglish": "Amazon S3 is the bedrock of all AWS ML architectures. It stores raw training data, holds final model tarballs, saves training checkpoints for Spot instances, and hosts your offline feature store.",
    "diagram": "  [ Raw Inputs ] \u2500\u2500> Amazon S3 \u2500\u2500(Pipe Mode / Fast File)\u2500\u2500> [ SageMaker Training ]\n                          \u2502\n                          \u25bc\n              S3 Lifecycle Policies (Standard -> Intelligent-Tiering -> Glacier)",
    "handwrittenNotes": {
      "mnemonic": "S3 = Unlimited object storage lake; S3 Fast File = Streaming without full download.",
      "examTrap": "Downloading entire 100 GB datasets to EC2 disks before training starts. Use SageMaker Fast File Mode to stream on the fly from S3.",
      "goldenRule": "Use S3 Intelligent-Tiering for ML datasets with unknown or changing access frequencies."
    },
    "bulletPoints": [
      "Supports SSE-S3 and SSE-KMS encryption at rest; enforce TLS via `aws:SecureTransport` bucket policy condition.",
      "S3 Event Notifications trigger Lambda or EventBridge when new training datasets land.",
      "Fast File mode streams S3 files into SageMaker containers without pre-allocating large EBS volumes."
    ],
    "scenarioTip": "Image classification model needs to access petabytes of images without pre-download delay: Use SageMaker Fast File Mode or Amazon FSx for Lustre linked to S3.",
    "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
  },
  "svc-s3-glacier": {
    "id": "svc-s3-glacier",
    "serviceName": "Amazon S3 Glacier",
    "category": "Storage",
    "isImportant": false,
    "role": "In-scope Storage service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "Amazon S3 Glacier is a key AWS service in the Storage category. In the MLA-C02 exam, understanding how Amazon S3 Glacier integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ Amazon S3 Glacier (Storage) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "Amazon S3 Glacier: Master its role in the Storage domain.",
      "examTrap": "Confusing Amazon S3 Glacier with other Storage services in multiple-choice questions.",
      "goldenRule": "Understand when Amazon S3 Glacier is preferred over alternative services for Storage workloads."
    },
    "bulletPoints": [
      "Category: Storage.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving Amazon S3 Glacier: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
  },
  "svc-storage-gateway": {
    "id": "svc-storage-gateway",
    "serviceName": "AWS Storage Gateway",
    "category": "Storage",
    "isImportant": false,
    "role": "In-scope Storage service supporting ML and AI workloads on the MLA-C02 exam.",
    "plainEnglish": "AWS Storage Gateway is a key AWS service in the Storage category. In the MLA-C02 exam, understanding how AWS Storage Gateway integrates with SageMaker, Bedrock, and data pipelines ensures robust system architecture.",
    "diagram": "  [ Upstream ML Pipeline ] \u2500\u2500> [ AWS Storage Gateway (Storage) ] \u2500\u2500> [ Downstream Monitoring / Audit ]",
    "handwrittenNotes": {
      "mnemonic": "AWS Storage Gateway: Master its role in the Storage domain.",
      "examTrap": "Confusing AWS Storage Gateway with other Storage services in multiple-choice questions.",
      "goldenRule": "Understand when AWS Storage Gateway is preferred over alternative services for Storage workloads."
    },
    "bulletPoints": [
      "Category: Storage.",
      "Official in-scope service for AWS Certified Machine Learning Engineer - Associate (MLA-C02).",
      "Exam focus: Understand operational efficiency, IAM security permissions, and integration with SageMaker/Bedrock.",
      "Best practice: Enforce least privilege access and CloudWatch monitoring."
    ],
    "scenarioTip": "Exam scenario involving AWS Storage Gateway: Choose the option that leverages AWS native integration and minimizes management overhead.",
    "url": "https://docs.aws.amazon.com/storagegateway/latest/userguide/what-is.html"
  }
};

export const AWS_SERVICE_CATEGORIES = [
  "Analytics",
  "Application Integration",
  "Cloud Financial Management",
  "Compute",
  "Containers",
  "Database",
  "Developer Tools",
  "Machine Learning and Artificial Intelligence",
  "Management and Governance",
  "Media",
  "Migration and Transfer",
  "Networking and Content Delivery",
  "Security, Identity, and Compliance",
  "Storage"
];
