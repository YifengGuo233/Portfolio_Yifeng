<template>
  <nav class="navbar-expand-lg navbar navbar-dark bg-dark">
    <span class="navbar-brand pointer" href="#">WeTalk|微话</span>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <span class="nav-link pointer" href="#">首页</span>
        </li>
      </ul>
      <ul id="profile_section" class="navbar-nav ml-auto">
        <li class="nav-item">
           <span class="nav-link pointer" id="profile">我的</span>
        </li>
        <li class="nav-item">
           <span class="nav-link pointer" id="logout">退出登录</span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
module.exports = {
    data: {
      hello: "你好"
    }
  }
}
</script>
