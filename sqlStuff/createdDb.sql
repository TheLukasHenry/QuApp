CREATE TABLE [User] (
    user_id INT PRIMARY KEY IDENTITY(1, 1),
    username NVARCHAR(50) NOT NULL,
    email NVARCHAR(100) NOT NULL,
    password NVARCHAR(255) NOT NULL,
    first_name NVARCHAR(50),
    last_name NVARCHAR(50)
);

CREATE TABLE [Feature] (
    feature_id INT PRIMARY KEY IDENTITY(1, 1),
    name NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX),
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME
);

CREATE TABLE [Test_Plan] (
    test_plan_id INT PRIMARY KEY IDENTITY(1, 1),
    creator_user_id INT NOT NULL FOREIGN KEY REFERENCES [User](user_id),
    title NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX),
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME
);

CREATE TABLE [Test_Plan_Version] (
    test_plan_version_id INT PRIMARY KEY IDENTITY(1, 1),
    test_plan_id INT NOT NULL FOREIGN KEY REFERENCES [Test_Plan](test_plan_id),
    version_number INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);

CREATE TABLE [Test_Run] (
    test_run_id INT PRIMARY KEY IDENTITY(1, 1),
    test_plan_version_id INT NOT NULL FOREIGN KEY REFERENCES [Test_Plan_Version](test_plan_version_id),
    executor_user_id INT NOT NULL FOREIGN KEY REFERENCES [User](user_id),
    start_time DATETIME NOT NULL,
    end_time DATETIME,
    status NVARCHAR(50) NOT NULL
);

CREATE TABLE [Test_Step] (
    test_step_id INT PRIMARY KEY IDENTITY(1, 1),
    test_plan_version_id INT NOT NULL FOREIGN KEY REFERENCES [Test_Plan_Version](test_plan_version_id),
    step_number INT NOT NULL,
    instruction NVARCHAR(MAX) NOT NULL,
    expected_result NVARCHAR(MAX) NOT NULL
);

CREATE TABLE [Test_Step_Execution] (
    test_step_execution_id INT PRIMARY KEY IDENTITY(1, 1),
    test_run_id INT NOT NULL FOREIGN KEY REFERENCES [Test_Run](test_run_id),
    test_step_id INT NOT NULL FOREIGN KEY REFERENCES [Test_Step](test_step_id),
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    status NVARCHAR(50) NOT NULL
);

CREATE TABLE [Feature_Test_Plan] (
    feature_test_plan_id INT PRIMARY KEY IDENTITY(1, 1),
    feature_id INT NOT NULL FOREIGN KEY REFERENCES [Feature](feature_id),
    test_plan_id INT NOT NULL FOREIGN KEY REFERENCES [Test_Plan](test_plan_id)
);