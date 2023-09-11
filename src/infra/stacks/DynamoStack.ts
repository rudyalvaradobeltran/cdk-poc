import { Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { getSuffixFromStack } from '../Utils';

export class DynamoStack extends Stack {
  public readonly dynamoTable: ITable;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const suffix = getSuffixFromStack(this);
   
    this.dynamoTable = new Table(this, 'DynamoTable', {
      partitionKey : {
          name: 'id',
          type: AttributeType.STRING
      },
      tableName: `DynamoTable-${suffix}`
    })
  }
}