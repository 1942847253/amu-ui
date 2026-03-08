# amu-admin-server

基于 `NestJS + Prisma + MySQL` 的后台服务端模板，为 `templates/amu-admin` 提供真实鉴权、权限模型和后台数据能力。

## 模板定位

- 这是 `amu-ui` 仓库内维护的服务端模板
- 默认用于支撑同仓库下的 `templates/amu-admin` 前端模板联调
- 内置一套可直接运行的 RBAC 与种子数据，不依赖本地假数据

## 核心能力

- JWT 双令牌鉴权：Access Token + Refresh Token
- Refresh Token 轮换与会话失效控制
- 企业级 RBAC：用户、角色、访问权限、菜单、部门、数据范围
- Prisma 迁移体系与 MySQL 持久化存储
- 声明式权限守卫：角色守卫、权限守卫、公开接口标记
- 当前用户上下文聚合：菜单树、权限清单、角色标签、数据范围
- Swagger 接口文档与健康检查接口

## 前置条件

### Docker 路径

- 已安装 Docker Desktop
- Docker Engine 处于运行状态
- 当前终端能够正常执行 `docker version` 和 `docker compose version`

### 本地开发路径

- 已安装 Node.js 与 pnpm
- 已准备可连接的 MySQL 8 实例
- 已按 `.env.example` 配置数据库连接与密钥

## 环境变量

复制 `.env.example` 为 `.env`，至少确认以下变量：

```bash
DATABASE_URL="mysql://amu_admin:amu_admin_123@127.0.0.1:3306/amu_admin"
AMU_ADMIN_ACCESS_SECRET="replace-with-a-long-random-access-secret"
AMU_ADMIN_REFRESH_SECRET="replace-with-a-long-random-refresh-secret"
SEED_MODE="demo"
```

补充说明：

- `docker compose` 会自动读取当前目录下的 `.env`
- 本地 CLI 使用 `DATABASE_URL`
- 容器内 `DATABASE_URL` 由 `MYSQL_DATABASE`、`MYSQL_USER`、`MYSQL_PASSWORD` 组合生成
- `SEED_MODE=demo` 会写入演示账号与演示审计日志
- `SEED_MODE=base` 仅写入基础 RBAC 数据和一个平台管理员，此时必须提供 `SEED_ADMIN_PASSWORD`

## 启动方式

### 方式一：Docker 一键启动

在当前目录执行：

```bash
pnpm run start:one-click
```

后台启动：

```bash
pnpm run start:one-click:detached
```

停止服务：

```bash
pnpm run stop:one-click
```

查看日志：

```bash
pnpm run logs:docker
```

如果你在仓库根目录执行，也可以直接使用：

```bash
pnpm run admin-server:start
```

### 方式二：本地 MySQL + 本地 Node

```bash
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm --filter amu-admin-server start:dev
```

这条路径适用于你不想依赖 Docker，或本机 Docker 环境暂时不可用的情况。

## Docker 使用说明

仅启动 MySQL：

```bash
docker compose up -d mysql
```

同时启动 MySQL 与服务端：

```bash
docker compose up --build
```

容器健康状态接口：

- 存活检查：`GET /api/health/live`
- 就绪检查：`GET /api/health/ready`
- 兼容入口：`GET /api/health`

## 常见故障排查

### 1. Docker daemon 未启动

如果启动时看到类似下面的报错：

```text
open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified
```

通常说明 Docker Desktop 没有启动，或者 Linux 引擎没有起来。处理顺序建议如下：

1. 启动 Docker Desktop，等待界面显示 Engine running
2. 在 PowerShell 中确认 `Get-Service com.docker.service` 不是 `Stopped`
3. 再执行 `docker version`，确认客户端和服务端都能正常返回
4. 之后重新执行 `pnpm run start:one-click`

### 2. 能执行 docker 命令，但 compose 无法连接

请检查当前 Docker context 是否可用：

```bash
docker context ls
```

如果当前 context 指向 `desktop-linux`，但 daemon 没有起来，也会导致 compose 连接失败。

### 3. 本机已有 MySQL 占用 3306

修改 `.env` 中的 `MYSQL_PORT`，避免端口冲突。

### 4. 数据库连接失败

请优先检查：

- `.env` 中的 `DATABASE_URL`
- MySQL 用户名、密码、数据库名是否与 compose 环境一致
- 本地 MySQL 是否允许当前账号连接

## 网络不稳定时安装

```bash
pnpm --filter amu-admin-server install:mirror
```

## 构建

```bash
pnpm --filter amu-admin-server build
```

## 数据库命令

```bash
pnpm --filter amu-admin-server db:generate
pnpm --filter amu-admin-server db:migrate
pnpm --filter amu-admin-server db:migrate:dev
pnpm --filter amu-admin-server db:seed
pnpm --filter amu-admin-server db:reset
```

## 默认账号

- 当 `SEED_MODE=demo` 时：
  - `admin / 123456`
  - `operator / 123456`
  - `audit / 123456`
  - `security / 123456`
- 当 `SEED_MODE=base` 时：
  - 仅创建一个平台管理员账号，用户名与密码来自 `SEED_ADMIN_USERNAME`、`SEED_ADMIN_PASSWORD`

## License

当前模板随仓库以 MIT License 提供，详见仓库根目录 `LICENSE`。
