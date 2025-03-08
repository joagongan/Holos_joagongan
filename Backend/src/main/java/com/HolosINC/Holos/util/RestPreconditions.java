package com.HolosINC.Holos.util;

import com.HolosINC.Holos.exceptions.ResourceNotFoundException;

public final class RestPreconditions {
	
	private RestPreconditions() {
        throw new AssertionError();
    }

    public static <T> T checkNotNull(final T resource,String resourceName, String fieldName, Object fieldValue) {
        if (resource == null) {
            throw new ResourceNotFoundException(resourceName, fieldName, fieldValue);
        }

        return resource;
    }
}
