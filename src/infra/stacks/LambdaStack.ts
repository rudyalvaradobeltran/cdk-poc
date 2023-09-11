import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';

interface LambdaStackProps extends StackProps {
  dynamoTable: ITable
}

export class LambdaStack extends Stack {
  public readonly lambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);
    const lambdaFunction = new NodejsFunction(this, 'LambdaFunction', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: (join(__dirname, '..','..', 'services', 'default.ts')),
      environment: {
        TABLE_NAME: props.dynamoTable.tableName,
      }
    });
   
    this.lambdaIntegration = new LambdaIntegration(lambdaFunction);
  }
}