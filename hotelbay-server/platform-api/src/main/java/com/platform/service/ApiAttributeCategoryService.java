package com.platform.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.platform.dao.ApiAttributeCategoryMapper;
import com.platform.entity.AttributeCategoryVo;
import com.platform.entity.CommentPictureVo;

@Service
public class ApiAttributeCategoryService {
	
	@Autowired
    private ApiAttributeCategoryMapper attributeCategoryDao;
	
	public AttributeCategoryVo queryObject(Integer id) {
        return attributeCategoryDao.queryObject(id);
    }


    public List<AttributeCategoryVo> queryList(Map<String, Object> map) {
        return attributeCategoryDao.queryList(map);
    }


    public int queryTotal(Map<String, Object> map) {
        return attributeCategoryDao.queryTotal(map);
    }

    public int save(AttributeCategoryVo comment) {
        return attributeCategoryDao.save(comment);
    }


    public void update(AttributeCategoryVo comment) {
    	attributeCategoryDao.update(comment);
    }


    public void delete(Integer id) {
    	attributeCategoryDao.delete(id);
    }


    public void deleteBatch(Integer[] ids) {
    	attributeCategoryDao.deleteBatch(ids);
    }

}
