package com.webappexample;

import org.jboss.logging.annotations.Param;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * Created by sean on 12/4/14.
 */
@RepositoryRestResource
public interface StudentRepository extends CrudRepository <Student, Integer>{

    List<Student> findById( int id);
}
