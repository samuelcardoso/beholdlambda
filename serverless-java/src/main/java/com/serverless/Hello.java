package com.serverless;
import java.util.HashMap;
import java.util.Map;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class Hello implements RequestHandler<Map<String, Object>, Response> {
	@Override
	public Response handleRequest(Map<String, Object> input, Context context) {
		Map<String, String> headers = new HashMap<>();
		headers.put("Content-Type", "application/json");
		return Response.builder()
				.setStatusCode(200)
				.setObjectBody("Hello World")
				.setHeaders(headers)
				.build();
	}
}
