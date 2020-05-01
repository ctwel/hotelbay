package com.platform.oss;

import com.platform.utils.DateUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.Date;
import java.util.UUID;

/**
 * 云存储(支持七牛、阿里云、腾讯云、又拍云)
 *
 * @author lipengjun
 * @email 939961241@qq.com
 * @date 2017-03-25 14:58
 */
public abstract class CloudStorageService {
    /**
     * 云存储配置信息
     */
    CloudStorageConfig config;

    /**
     * 文件路径
     *
     * @param prefix 前缀
     * @return 返回上传路径
     */
    public String getPath(String prefix) {
        //生成uuid
        String uuid = UUID.randomUUID().toString().replaceAll("-", "");
        //文件路径
        String path = DateUtils.format(new Date(), "yyyyMMdd") + "/" + DateUtils.format(new Date(), "HHmmssS") + uuid.substring(0, 5);
        
//        String path = "";

        if (StringUtils.isNotBlank(prefix)) {
            path = prefix + "/" + path;
        }

        return path;
    }

    /**
     * 文件上传
     *
     * @param file 文件
     * @return 返回http地址
     */
    public abstract String upload(MultipartFile file) throws Exception;
    //================================================请看这里=======================================
    //这个抽象函数有三个实现类（鼠标悬停，按住ctrl），，，，，，，，，，，他们调用了getpath
    //把原始的文件名作为参数传进来就可以了，重写一下getpath函数
    //我是这么想的哦，行不行我就不知道，，，，，，，，，，，，，，，，，，，，，再见！
    
    

    /**
     * 文件上传
     *
     * @param data 文件字节数组
     * @param path 文件路径，包含文件名
     * @return 返回http地址
     */
    public abstract String upload(byte[] data, String path);

    /**
     * 文件上传
     *
     * @param inputStream 字节流
     * @param path        文件路径，包含文件名
     * @return 返回http地址
     */
    public abstract String upload(InputStream inputStream, String path);

}
