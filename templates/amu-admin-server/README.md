# amu-admin-server

基于 NestJS + Prisma + MySQL 的 amu-admin 服务端模板，提供可直接落地的企业级权限模型。

## 核心能力

- JWT 双令牌鉴权：Access Token + Refresh Token
- Refresh Token 轮换与会话失效控制
- 企业级 RBAC：用户、角色、访问权限、菜单、部门、数据范围
- Prisma 迁移体系与 MySQL 持久化仓储
- 声明式权限守卫：角色守卫、权限守卫、公开接口标记
- 当前用户上下文聚合：菜单树、权限清单、角色标签、数据范围
- Swagger 接口文档

## 环境变量

复制 `.env.example` 为 `.env`，至少配置以下变量：

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
- `SEED_MODE=demo` 会写入演示账号和演示审计日志
- `SEED_MODE=base` 仅写入基础 RBAC 数据和一个平台管理员，此时必须提供 `SEED_ADMIN_PASSWORD`

## 启动

一键启动整个服务：

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

本地开发模式：

```bash
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm --filter amu-admin-server start:dev
```

## Docker 启动

仅启动 MySQL：

```bash
docker compose up -d mysql
```

同时启动 MySQL 与服务端：

```bash
docker compose up --build
```

容器健康状态：

- 存活检查：`GET /api/health/live`
- 就绪检查：`GET /api/health/ready`
- 兼容入口：`GET /api/health`

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
	- admin / 123456
	- operator / 123456
	- audit / 123456
	- security / 123456
- 当 `SEED_MODE=base` 时：
	- 仅创建一个平台管理员账号，用户名与密码来自 `SEED_ADMIN_USERNAME`、`SEED_ADMIN_PASSWORD`
