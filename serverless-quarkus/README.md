# TO RUN
Ref: https://quarkus.io/guides/amazon-lambda
Ref 2: https://github.com/jOOQ/jOOQ/issues/8779
Ref 3: https://quarkus.io/guides/writing-native-applications-tips
1) Install GRAALVM 19.3.1
2) Install SAM
3) export JAVA_HOME=/usr/lib/jvm/graalvm
4) export GRAALVM_HOME=/usr/lib/jvm/graalvm
4.1) set PATH = /home/samuel/desenv/workspaces/zup/si2/nativesamples/serverless-quarkus/src/META-INF/resources/; %PATH%
Read more: https://javarevisited.blogspot.com/2012/03/javalangunsatisfiedlinkerror-no-dll-in.html#ixzz6KP0qq6KL
5) mvn clean install -Dnative -H:Log=registerResource
5.1) mvnw clean install -Pnative -Dnative-image.docker-build=true
6) GRAALVM_HOME/bin/gu install native-image
7) sam local invoke --template sam.native.yaml --event payload.json