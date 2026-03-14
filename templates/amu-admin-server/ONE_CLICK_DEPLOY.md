# amu-admin 一键部署

这份说明用于把 `templates/amu-admin` 和 `templates/amu-admin-server` 一起部署到云服务器。

当前仓库已经提供完整的全栈 Docker Compose：

- MySQL
- amu-admin-server
- amu-admin 前端静态站点（Nginx）

前端会自动把 `/api` 请求转发到后端，因此默认不需要额外再配宿主机 Nginx。

## 前置条件

- Linux 云服务器一台
- 已安装 Docker
- 已安装 Docker Compose
- 服务器已开放前端访问端口，默认是 `80`

## 第一步：准备目录

把当前仓库上传到服务器，例如：

```bash
/srv/amu-ui-new
```

后续命令都在下面这个目录执行：

```bash
cd /srv/amu-ui-new/templates/amu-admin-server
```

## 第二步：准备环境变量

复制环境变量模板：

```bash
cp .env.example .env
```

至少修改以下字段：

- `AMU_ADMIN_ACCESS_SECRET`
- `AMU_ADMIN_REFRESH_SECRET`
- `MYSQL_PASSWORD`
- `MYSQL_ROOT_PASSWORD`
- `SEED_MODE`
- `SEED_ADMIN_PASSWORD`
- `WEB_PORT`
- `APP_BASE_PATH`

推荐生产配置：

```bash
MYSQL_BIND_HOST="127.0.0.1"
WEB_PORT="80"
APP_BASE_PATH="/amu-admin/"
SEED_MODE="base"
SEED_ADMIN_USERNAME="admin"
SEED_ADMIN_PASSWORD="请改成强密码"
```

说明：

- `MYSQL_BIND_HOST=127.0.0.1` 表示数据库只暴露给宿主机本机
- `SEED_MODE=base` 只会初始化基础 RBAC 和一个管理员账号，更适合生产环境
- 如果只是想先验收联通性，可以暂时使用 `SEED_MODE=demo`

## 第三步：一键启动

前台启动：

```bash
docker compose -f docker-compose.full.yml up --build
```

后台启动：

```bash
docker compose -f docker-compose.full.yml up -d --build
```

如果你已经在仓库根目录，也可以直接使用：

```bash
pnpm run admin-stack:start:detached
```

## 第四步：查看状态

查看整套日志：

```bash
docker compose -f docker-compose.full.yml logs -f web app mysql
```

停止服务：

```bash
docker compose -f docker-compose.full.yml down
```

## 第五步：访问地址

假设你的服务器 IP 是 `1.2.3.4`，且 `WEB_PORT=80`、`APP_BASE_PATH=/amu-admin/`：

- 前端首页：`http://1.2.3.4/amu-admin/`
- Swagger：`http://1.2.3.4/api/docs`
- 就绪检查：`http://1.2.3.4/api/health/ready`

## 默认账号

当 `SEED_MODE=demo` 时：

- `admin / 123456`
- `operator / 123456`
- `audit / 123456`
- `security / 123456`

当 `SEED_MODE=base` 时：

- 只会创建一个平台管理员账号
- 用户名与密码来自 `SEED_ADMIN_USERNAME`、`SEED_ADMIN_PASSWORD`

## 生产建议

- 首次验证通过后，把 `WEB_PORT` 切到 `443` 前面再挂宿主机 Nginx 或云厂商负载均衡
- 不要把 MySQL 直接暴露到公网
- 不要在生产环境使用默认密钥和默认密码
- 如果要保留 Swagger，至少加上 IP 白名单
- 升级前先备份 `mysql_data` 卷