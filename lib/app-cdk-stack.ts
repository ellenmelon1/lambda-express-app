import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class AppCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFn = new lambda.Function(this, 'practiceLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('src'),
      handler: 'lambda.handler',
  })

  const api = new apigateway.LambdaRestApi(this, 'practiceApi', {
    handler: lambdaFn,
  });

  // const lambdaIntegration = new apigateway.LambdaIntegration(lambdaFn);

  // const apiResource = api.root.addResource('apiResource');
  //   apiResource.addMethod('ANY', lambdaIntegration);
  
}
}
