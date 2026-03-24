## 数据库入门（PostgreSQL）

SQL 语法教程：https://neon.com/postgresql/tutorial

### 数据库表设计核心原则

- 一表一主题，每个表只存储一个主题的数据。少用 NULL，用默认值代替。
- 每个表都有一个唯一的主键，用于标识表中的每一行数据。静止无主键、业务字段当主键（如手机号）
- 避免重复存储相同数据，要通过关联表 / 外键解决。
- 适度反范式化，根据业务需求和查询频率，纯范式会导致大量关联查询，高频查询字段允许适度冗余。
- 命名规范统一：
  - 表名：复数，下划线分隔（如user_order）
  - 字段名：见名知意，或下划线分隔（如first_name）
  - 统一：时间用 create_time、update_time，状态用 status

总结：

- 核心目标：数据准确、查询高效、结构稳定、易于维护
- 核心平衡：范式（规范） vs 反范式（性能）
- 企业标准：主键 + 审计字段 + 逻辑关联 + 合理索引 + 规范命名

**必备审计字段（行业标准）**

```sql
create_time  DATETIME  COMMENT '创建时间',
update_time  DATETIME  COMMENT '更新时间',
is_deleted   TINYINT   COMMENT '是否删除 0-否 1-是'
```

### 数据库操作

**数据库操作示例**

```sql
-- 创建数据库
CREATE DATABASE database_name;
-- 删除数据库
DROP DATABASE database_name;
```

**表操作示例**

```sql
-- 创建表
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    status SMALLINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 删除表
DROP TABLE users;
```

### 主键和外键

主键：每个表都有一个唯一的主键，用于标识表中的每一行数据。静止无主键、业务字段当主键（如手机号）。

外键：用于关联两个表之间的关系，确保数据的一致性和完整性。

| 对比维度 | 主键（Primary Key）            | 外键（Foreign Key）        |
| -------- | ------------------------------ | -------------------------- |
| 作用     | 唯一标识表中的每一行数据       | 建立表与表之间的关联       |
| 唯一性   | ✅ 必须唯一                    | ❌ 可以重复                |
| 空值     | ❌ 不能为空（NOT NULL）        | ✅ 可以为空（NULL）        |
| 数量     | 每表最多1个主键                | 可以有多个外键             |
| 所在表   | 在自己的表中                   | 在子表中，引用父表主键     |
| 约束     | 唯一约束 + 非空约束            | 引用完整性约束             |
| 删除影响 | 不能被直接删除（有外键依赖时） | 可以删除，但可能违反完整性 |

### 索引

索引：索引是一种特殊的表，用于加速查询操作，提高数据库性能。

- 有索引：查询速度更快，数据库查询会到索引内查找到数据对应的位置，快速定位到表中符合条件的行。
- 无索引：查询速度较慢，因为数据库需要扫描整张表。

```sql
-- 创建索引
CREATE INDEX idx_username ON table_name (field_name);
-- 删除索引
DROP INDEX table_name_idx_username;
```

### 事务

事务：事务是一种数据库操作，包含多个操作，这些操作要么全部成功执行要么全部失败执行。

```sql
BEGIN; -- 开始事务

DO $$ -- 执行事务
BEGIN -- 开始事务

    -- 一堆增删改操作
    -- 使用 PERFORM 检查是否存在符合条件的记录
    PERFORM * FROM bank_example WHERE id = 1 AND balance >= 200;

    IF NOT FOUND THEN -- 如果不存在符合条件的记录
        RAISE EXCEPTION '转账失败：余额不足200元';
    END IF;

    -- 执行扣款
    UPDATE bank_example SET balance = balance - 200 WHERE id = 1;
    UPDATE bank_example SET balance = balance + 200 WHERE id = 2;

END $$; -- 结束事务

COMMIT; -- 提交执行事务

-- 当事务过程中发生错误时，回滚事务，将数据库状态恢复到事务开始前的状态
ROLLBACK; -- 回滚事务
```

### ORM vs SQL

ORM = 对象关系映射，用写代码（对象、方法）的方式，来操作数据库，不用手写 SQL。

```sql
-- 原生 SQL 写法
SELECT * FROM users WHERE id = 1;
UPDATE users SET name = '张三' WHERE id = 1;
```

```js
// ORM 写法
// 找到 id=1 的用户
user = User.objects.get((id = 1));

// 修改名字
user.name = "张三";
user.save();
```

|            | 原生 SQL                     | ORM                   |
| ---------- | ---------------------------- | --------------------- |
| 写法       | 写数据库查询语句             | 写面向对象代码        |
| 难度       | 要记语法、防注入             | 简单，像操作对象      |
| 数据库兼容 | 换数据库（MySQL→PG）要改 SQL | 基本不用改代码        |
| 灵活性     | 极高，复杂查询随便写         | 复杂查询不如 SQL 方便 |
| 安全性     | 容易写漏，出现 SQL 注入      | 自带防注入，更安全    |

### 分页查询

**示例：**

```sql
-- 分页查询
SELECT * FROM users
ORDER BY id
OFFSET 0 -- 跳过0条记录，offset 越大越慢
LIMIT 10; -- 取10条记录

-- 分页查询第2页，每页10条记录
SELECT * FROM users
ORDER BY id
OFFSET 10 -- 跳过10条记录
LIMIT 10; -- 取10条记录

-- 总数
SELECT COUNT(*) FROM users;
```

### 软删除

软删除：软删除是一种数据表操作，用于在不删除记录的情况下，将记录的状态设置为“已删除”。

**示例：**

```sql
-- 加个 is_deleted 字段，默认值为0，表示未删除
-- 删除时不执行 DELETE 操作，而是将 is_deleted 字段设置为1
UPDATE users SET is_deleted = 1 WHERE id = 1;
```

### 聚合查询

聚合查询：聚合查询是一种数据表操作，用于对多个记录进行汇总统计，如求和、求平均值、求最大值、求最小值等。

**示例：**

```sql
COUNT(*)      -- 统计条数
SUM(字段)      -- 求和
AVG(字段)      -- 平均值
MAX(字段)      -- 最大值
MIN(字段)      -- 最小值

-- 总人数
SELECT COUNT(*) FROM users;

-- 总工资
SELECT SUM(salary) FROM users;

-- 平均工资
SELECT AVG(salary) FROM users;

-- 最大/最小年龄
SELECT MAX(age), MIN(age) FROM users;
```

### JSONB

PostgreSQL 数据库中，JSONB 是一种用于存储 JSON 格式数据的半结构化数据类型。

**示例：**

```sql
-- 存储 JSON 格式数据
INSERT INTO users (name, age, info) VALUES ('张三', 30, '{"city": "北京", "email": "zhangsan@example.com"}');

-- 查询 JSON 格式数据
SELECT * FROM users WHERE info ->> 'city' = '北京';

-- 更新 JSON 格式数据
UPDATE users SET info = info || '{"email": "zhangsan@example.com"}' WHERE id = 1;

-- 删除 JSON 格式数据中的 email 字段
UPDATE users SET info = info - 'email' WHERE id = 1;
```
