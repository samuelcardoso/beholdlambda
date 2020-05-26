package com.serverless;
import java.util.HashMap;
import java.util.Map;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class Hello implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
	@Override
	public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
		Response responseBody = new Response("Hello World");
		Map<String, String> headers = new HashMap<>();
		headers.put("Content-Type", "application/json");
		return ApiGatewayResponse.builder()
				.setStatusCode(200)
				.setObjectBody(responseBody)
				.setHeaders(headers)
				.build();
	}
}
