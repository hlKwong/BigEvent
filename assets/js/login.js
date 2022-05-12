$(function() {
    //    点击去注册账号链接跳转至去登录账号
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击去登录账号链接跳转至去注册账号
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    var form = layui.form

    var layer = layui.layer

    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return layer.msg('两次密码不一致！');
            }
        }
    })


    // // 监听注册表单的提交时间---有问题 半天没研究明白 最后又是发现data写成了date,,欲哭无泪
    $('#form_reg').on('submit', function(e) {
        // 先阻止默认提交时间
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }

        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#link_login').click()
            }
        })

    })


    // // 监听注册表单的提交事件(方法二)
    // $('#form_reg').on('submit', function(e) {
    //     // 1. 阻止默认的提交行为
    //     e.preventDefault()
    //         // 2. 发起Ajax的POST请求
    //     var data = {
    //         username: $('#form_reg [name=username]').val(),
    //         password: $('#form_reg [name=password]').val()
    //     }
    //     $.post('/api/reguser', data, function(res) {
    //         if (res.status !== 0) {
    //             return layer.msg(res.message)
    //         }
    //         layer.msg('注册成功，请登录！')
    //             // 模拟人的点击行为
    //         $('#link_login').click()
    //     })
    // })


    //开始写登陆

    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: {
                username: $('#form_login [name=username]').val(),
                password: $('#form_login [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功!')

                // 将token保存到本地缓存中
                localStorage.setItem('token', res.token)

                //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })

})