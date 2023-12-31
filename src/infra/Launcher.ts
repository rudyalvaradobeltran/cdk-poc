import { App } from 'aws-cdk-lib';
import { DynamoStack } from './stacks/DynamoStack';
import { LambdaStack } from './stacks/LambdaStack';
import { ApiStack } from './stacks/APIStack';

const app = new App();
const dynamoStack = new DynamoStack(app, 'DynamoStack');
const lambdaStack = new LambdaStack(app, 'LambdaStack', {
  dynamoTable: dynamoStack.dynamoTable
});
new ApiStack(app, 'ApiStack', {
  lambdaIntegration: lambdaStack.lambdaIntegration
});
