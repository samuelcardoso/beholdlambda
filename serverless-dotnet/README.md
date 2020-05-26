#dotnet tool install --global Amazon.Lambda.Tools --version 3.1.1
#dotnet tool update -g Amazon.Lambda.Tools

./build.sh
serverless deploy