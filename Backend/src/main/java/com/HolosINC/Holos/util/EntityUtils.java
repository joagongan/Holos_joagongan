package com.HolosINC.Holos.util;

import java.util.Collection;

import org.springframework.orm.ObjectRetrievalFailureException;
import com.HolosINC.Holos.model.BaseUser;

public abstract class EntityUtils {

	public static <T extends BaseUser> T getById(Collection<T> entities, Class<T> entityClass, int entityId)
			throws ObjectRetrievalFailureException {
		for (T entity : entities) {
			if (entity.getId() == entityId && entityClass.isInstance(entity)) {
				return entity;
			}
		}
		throw new ObjectRetrievalFailureException(entityClass, entityId);
	}

}
