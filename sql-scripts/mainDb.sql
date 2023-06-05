CREATE DATABASE main;

-- Switch to the new database
USE main;



-- main.dbo.companies definition

-- Drop table

-- DROP TABLE main.dbo.companies;

CREATE TABLE main.dbo.companies (
	id int IDENTITY(1,1) NOT NULL,
	name varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__Companie__2D971C4C4F0BA232 PRIMARY KEY (id)
);


-- main.dbo.statuses definition

-- Drop table

-- DROP TABLE main.dbo.statuses;

CREATE TABLE main.dbo.statuses (
	id int IDENTITY(1,1) NOT NULL,
	name varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__Statuses__C8EE204379642C26 PRIMARY KEY (id)
);


-- main.dbo.users definition

-- Drop table

-- DROP TABLE main.dbo.users;

CREATE TABLE main.dbo.users (
	id int IDENTITY(1,1) NOT NULL,
	name varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	email varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	passwordHash varbinary(64) NOT NULL,
	CONSTRAINT PK__Users__1788CCAC662A89C8 PRIMARY KEY (id),
	CONSTRAINT UQ__Users__A9D10534EEF3E8D0 UNIQUE (email)
);


-- main.dbo.companyUsers definition

-- Drop table

-- DROP TABLE main.dbo.companyUsers;

CREATE TABLE main.dbo.companyUsers (
	companyId int NOT NULL,
	userId int NOT NULL,
	CONSTRAINT PK__CompanyU__FCEF9086B11BA0B2 PRIMARY KEY (companyId,userId),
	CONSTRAINT FK__CompanyUs__Compa__3E52440B FOREIGN KEY (companyId) REFERENCES main.dbo.companies(id),
	CONSTRAINT FK__CompanyUs__UserI__3F466844 FOREIGN KEY (userId) REFERENCES main.dbo.users(id)
);


-- main.dbo.features definition

-- Drop table

-- DROP TABLE main.dbo.features;

CREATE TABLE main.dbo.features (
	id int IDENTITY(1,1) NOT NULL,
	name varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	companyId int NOT NULL,
	CONSTRAINT PK__Features__82230A2941B5D8C0 PRIMARY KEY (id),
	CONSTRAINT FK__Features__Compan__4222D4EF FOREIGN KEY (companyId) REFERENCES main.dbo.companies(id)
);
 CREATE NONCLUSTERED INDEX idx_Features_CompanyID ON dbo.features (  companyId ASC  )  
	 WITH (  PAD_INDEX = OFF ,FILLFACTOR = 100  ,SORT_IN_TEMPDB = OFF , IGNORE_DUP_KEY = OFF , STATISTICS_NORECOMPUTE = OFF , ONLINE = OFF , ALLOW_ROW_LOCKS = ON , ALLOW_PAGE_LOCKS = ON  )
	 ON [PRIMARY ] ;


-- main.dbo.testCases definition

-- Drop table

-- DROP TABLE main.dbo.testCases;

CREATE TABLE main.dbo.testCases (
	id int IDENTITY(1,1) NOT NULL,
	featureId int NOT NULL,
	name varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	sortOrder int DEFAULT 0 NOT NULL,
	parentId int NULL,
	CONSTRAINT PK__TestCase__D2074B74E05B28E9 PRIMARY KEY (id),
	CONSTRAINT FK__TestCases__Featu__4AB81AF0 FOREIGN KEY (featureId) REFERENCES main.dbo.features(id),
	CONSTRAINT FK__TestCases__Parent__5AEE82F4 FOREIGN KEY (parentId) REFERENCES main.dbo.testCases(id)
);


-- main.dbo.testResults definition

-- Drop table

-- DROP TABLE main.dbo.testResults;

CREATE TABLE main.dbo.testResults (
	testResultId int IDENTITY(1,1) NOT NULL,
	featureId int NULL,
	resultsJson nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	userId int NULL,
	[date] date NULL,
	CONSTRAINT PK__testResu__DD1FEA8DECA04BED PRIMARY KEY (testResultId),
	CONSTRAINT FK__testResults__FeatureId FOREIGN KEY (featureId) REFERENCES main.dbo.features(id),
	CONSTRAINT FK__testResults__UserId FOREIGN KEY (userId) REFERENCES main.dbo.users(id)
);


-- main.dbo.testRuns definition

-- Drop table

-- DROP TABLE main.dbo.testRuns;

CREATE TABLE main.dbo.testRuns (
	id int IDENTITY(1,1) NOT NULL,
	name varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	[date] date NOT NULL,
	userId int NOT NULL,
	startTime datetime2 NOT NULL,
	endTime datetime2 NOT NULL,
	testRunStatus int NOT NULL,
	CONSTRAINT PK__TestRuns__BF2F962E1096CB3F PRIMARY KEY (id),
	CONSTRAINT FK__TestRuns__TestRu__47DBAE45 FOREIGN KEY (testRunStatus) REFERENCES main.dbo.statuses(id),
	CONSTRAINT FK__TestRuns__UserID__46E78A0C FOREIGN KEY (userId) REFERENCES main.dbo.users(id)
);
 CREATE NONCLUSTERED INDEX idx_TestRuns_UserID ON dbo.testRuns (  userId ASC  )  
	 WITH (  PAD_INDEX = OFF ,FILLFACTOR = 100  ,SORT_IN_TEMPDB = OFF , IGNORE_DUP_KEY = OFF , STATISTICS_NORECOMPUTE = OFF , ONLINE = OFF , ALLOW_ROW_LOCKS = ON , ALLOW_PAGE_LOCKS = ON  )
	 ON [PRIMARY ] ;


-- main.dbo.testRunCases definition

-- Drop table

-- DROP TABLE main.dbo.testRunCases;

CREATE TABLE main.dbo.testRunCases (
	id int IDENTITY(1,1) NOT NULL,
	testRunId int NOT NULL,
	testCaseId int NOT NULL,
	testCaseStatus int NOT NULL,
	testCaseComment varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__TestRunC__34F1113D81FEEA58 PRIMARY KEY (id),
	CONSTRAINT FK__TestRunCa__TestC__4E88ABD4 FOREIGN KEY (testCaseId) REFERENCES main.dbo.testCases(id),
	CONSTRAINT FK__TestRunCa__TestC__4F7CD00D FOREIGN KEY (testCaseStatus) REFERENCES main.dbo.statuses(id),
	CONSTRAINT FK__TestRunCa__TestR__4D94879B FOREIGN KEY (testRunId) REFERENCES main.dbo.testRuns(id)
);









CREATE PROCEDURE AddCompanyUser_new
@companyId INT,
@userId INT
AS
BEGIN
INSERT INTO companyUsers (companyId, userId)
VALUES (@companyId, @userId)
END;

CREATE PROCEDURE AddResult
    @testResultId INT,
    @newJsonResult NVARCHAR(MAX)
AS
BEGIN
    -- Check if the object exists in the array
    DECLARE @key NVARCHAR(10);

    WITH cte AS (
        SELECT 
            testResultId,
            JSON_VALUE([value], '$.testCaseId') as testCaseId,
            resultsJson,
            o.*
        FROM testResults
        CROSS APPLY OPENJSON(JSON_QUERY(resultsJson, '$')) o 
        WHERE testResultId = @testResultId AND JSON_VALUE(o.value, '$.testCaseId') = JSON_VALUE(@newJsonResult, '$.testCaseId')
    )
    SELECT @key = [key] FROM cte;

    -- If the object exists, update it
    IF @key IS NOT NULL
    BEGIN
        UPDATE testResults
        SET resultsJson = JSON_MODIFY(resultsJson, '$[' + @key + ']', JSON_QUERY(@newJsonResult))
        WHERE testResultId = @testResultId
    END
    -- If the object doesn't exist, append it to the array
    ELSE
    BEGIN
        UPDATE testResults
        SET resultsJson = JSON_MODIFY(resultsJson, 'append $', JSON_QUERY(@newJsonResult))
        WHERE testResultId = @testResultId
    END
END;

CREATE PROCEDURE dbo.createCompany
    @name NVARCHAR(50)
AS
BEGIN
    DECLARE @insertedCompanies TABLE
    (
        id INT,
        name NVARCHAR(50)
    );

    INSERT INTO companies (name)
    OUTPUT INSERTED.id, INSERTED.name INTO @insertedCompanies
    VALUES (@name);

    SELECT id, name
    FROM @insertedCompanies;
END;

CREATE PROCEDURE dbo.createFeature
    @name VARCHAR(50),
    @companyId INT
AS
BEGIN
    DECLARE @createdFeature TABLE (
        id INT,
        name VARCHAR(50),
        companyId INT
    );

    INSERT INTO features (name, companyId)
    OUTPUT inserted.id, inserted.name, inserted.companyId INTO @createdFeature
    VALUES (@name, @companyId);

    SELECT id, name, companyId
    FROM @createdFeature;
END;

CREATE PROCEDURE dbo.CreateStatus
    @name VARCHAR(50)
AS
BEGIN
    INSERT INTO statuses (name)
    VALUES (@name)
END;

CREATE  PROCEDURE dbo.createTestCase
    @featureId INT,
    @name VARCHAR(50),
    @parentId INT = NULL, -- Default value of NULL
    @sortOrder INT = 99
AS
BEGIN
    INSERT INTO testCases (featureId, name, parentId, sortOrder)
    OUTPUT inserted.id, inserted.featureId, inserted.name, inserted.parentId, inserted.sortOrder
    VALUES (@featureId, @name, @parentId, @sortOrder)
END;

CREATE PROCEDURE CreateTestResults
    @featureId INT,
    @userId INT,
    @date DATE,
    @resultsJson NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO main.dbo.testResults (featureId, userId, date, resultsJson)
    VALUES (@featureId, @userId, @date, @resultsJson);
END;

--SELECT * FROM testRuns tr  ;



--EXEC CreateTestRunCase @testRunId = 1, @testCaseId = 3, @testCaseStatus = 1, @testCaseComment = "pppRwoooorrrk" ;

CREATE  PROCEDURE dbo.CreateTestRun
    @name VARCHAR(50),
    @date DATE,
    @userId INT,
    @startTime DATETIME2,
    @endTime DATETIME2,
    @testRunStatus INT
AS
BEGIN
    INSERT INTO testRuns (name, date, userId, startTime, endTime, testRunStatus)
    VALUES (@name, @date, @userId, @startTime, @endTime, @testRunStatus)

    SELECT * FROM testRuns WHERE id = SCOPE_IDENTITY();
END;

--SELECT * FROM testRunCases trc  ;



--EXEC CreateTestRunCase @testRunId = 1, @testCaseId = 3, @testCaseStatus = 1, @testCaseComment = "woooorrrk" ;

CREATE PROCEDURE CreateTestRunCase
@testRunId INT,
@testCaseId INT,
@testCaseStatus INT,
@testCaseComment NVARCHAR(255)
AS
BEGIN
DECLARE @NewTestRunCaseId INT;

INSERT INTO testRunCases (testRunId, testCaseId, testCaseStatus, testCaseComment)
VALUES (@testRunId, @testCaseId, @testCaseStatus, @testCaseComment);

SET @NewTestRunCaseId = SCOPE_IDENTITY();

SELECT * FROM testRunCases WHERE id = @NewTestRunCaseId;
END;

CREATE PROCEDURE dbo.CreateUser
    @name VARCHAR(50),
    @email VARCHAR(100),
    @passwordHash VARBINARY(64)
AS
BEGIN
    INSERT INTO users (name, email, passwordHash)
    VALUES (@name, @email, @passwordHash)
END;

CREATE PROCEDURE dbo.DeleteCompany
    @id INT
AS
BEGIN
    DELETE FROM companies
    WHERE id = @id;
END;

-- Create new stored procedures with updated names
CREATE PROCEDURE DeleteFeature_new
@id INT
AS
BEGIN
DELETE FROM features
WHERE id = @id
END;

CREATE PROCEDURE DeleteTestCase_new
@id int
AS
BEGIN
DELETE FROM dbo.testRunCases WHERE testCaseId = @id;
DELETE FROM dbo.testCases WHERE id = @id;
END;

CREATE PROCEDURE dbo.DeleteTestRun
    @id INT
AS
BEGIN
    DELETE FROM testRuns
    WHERE id = @id;
END;

-- DeleteTestRunCase
CREATE PROCEDURE dbo.deleteTestRunCase
  @id int
AS
BEGIN
  DELETE FROM dbo.testRunCases WHERE id = @id;
END;

CREATE PROCEDURE dbo.DeleteUser
    @id INT
AS
BEGIN
    DELETE FROM users WHERE id = @id;
END;

CREATE PROCEDURE dbo.GetAllCompanies
AS
BEGIN
    SELECT * FROM companies;
END;

CREATE PROCEDURE dbo.GetAllFeatures
AS
BEGIN
    SELECT *
    FROM features;
END;

CREATE PROCEDURE GetAllTestCases_new
AS
BEGIN
SELECT * FROM dbo.testCases;
END;

CREATE  PROCEDURE dbo.GetAllTestCasesByFeatureId
    @featureId int
AS
BEGIN
    -- Call the procedure first
    EXEC UpdateSortOrderForDuplicates @featureId;

    SELECT
        id,
        featureId,
        name,
        parentId,
        sortOrder
    FROM
        testCases
    WHERE
        featureId = @featureId
    ORDER BY
        sortOrder;
END;

CREATE PROCEDURE GetAllTestResults
AS
BEGIN
    SELECT * FROM main.dbo.testResults;
END;

CREATE PROCEDURE dbo.GetAllTestRuns
AS
BEGIN
    SELECT *
    FROM testRuns;
END;

CREATE PROCEDURE dbo.GetAllUsers
AS
BEGIN
    SELECT * FROM users;
END;

CREATE PROCEDURE dbo.GetCompanyById
    @id INT
AS
BEGIN
    SELECT * FROM companies
    WHERE id = @id;
END;

CREATE PROCEDURE dbo.GetCompanyUsersByCompanyId
    @companyId INT
AS
BEGIN
    SELECT * FROM companyUsers
    WHERE companyId = @companyId;
END;

CREATE PROCEDURE GetCompanyUsersByUserId
@userId INT
AS
BEGIN
SELECT * FROM companyUsers
WHERE userId = @userId
END;

CREATE PROCEDURE dbo.GetFeatureById 
    @id int
AS
BEGIN
    SELECT * 
    FROM features
    WHERE id = @id;
END;

CREATE PROCEDURE dbo.GetFeaturesByCompany
    @companyId INT
AS
BEGIN
    SELECT * FROM features
    WHERE companyId = @companyId;
END;

CREATE PROCEDURE GetTestCaseById_new
@id int
AS
BEGIN
SELECT * FROM dbo.testCases WHERE id = @id;
END;

CREATE PROCEDURE GetTestResultsByFeatureId
    @featureId INT
AS
BEGIN
    SELECT * FROM main.dbo.testResults WHERE featureId = @featureId;
END;

CREATE PROCEDURE dbo.GetTestRunByID
    @id INT
AS
BEGIN
    SELECT *
    FROM testRuns
    WHERE id = @id;
END;

CREATE PROCEDURE getTestRunCaseById
    @id INT
AS
BEGIN
    SELECT *
    FROM testRunCases
    WHERE id = @id;
END;

CREATE PROCEDURE GetTestRunCasesByTestRunID_new
@testRunId INT
AS
BEGIN
SELECT * FROM testRunCases WHERE testRunId = @testRunId;
END;

CREATE PROCEDURE dbo.GetUserByEmail
    @email VARCHAR(100)
AS
BEGIN
    SELECT * FROM users
    WHERE email = @email
END;

CREATE PROCEDURE dbo.GetUserById
    @id INT
AS
BEGIN
    SELECT * FROM users WHERE id = @id
END;

CREATE  PROCEDURE MoveTestcases
    @testCaseIdsList VARCHAR(255),
    @amountOfRowsToMove INT
AS
BEGIN
    -- Convert the @TestCaseIDsList string to a table
    DECLARE @testCaseIds TABLE (testCaseId INT);
    INSERT INTO @testCaseIds (testCaseId)
    SELECT value FROM STRING_SPLIT(@testCaseIdsList, ',');

    -- Get the featureId of the first testCase in the list (assuming all testCases in the list have the same featureId)
    DECLARE @featureId INT = (SELECT TOP 1 featureId FROM main.dbo.testCases WHERE id IN (SELECT testCaseId FROM @testCaseIds));

    -- Get the minimum and maximum sortOrder of the testCases to be moved
    DECLARE @minSortOrder INT = (SELECT MIN(sortOrder) FROM main.dbo.testCases WHERE id IN (SELECT testCaseId FROM @testCaseIds));
    DECLARE @maxSortOrder INT = (SELECT MAX(sortOrder) FROM main.dbo.testCases WHERE id IN (SELECT testCaseId FROM @testCaseIds));

    -- Calculate the new sortOrder values for the testCases to be moved
    DECLARE @newMinSortOrder INT = @minSortOrder + @amountOfRowsToMove;
    DECLARE @newMaxSortOrder INT = @maxSortOrder + @amountOfRowsToMove;

    -- Move the testCases which are in the way of the new positions to their new positions
    IF @amountOfRowsToMove > 0
    BEGIN
        UPDATE main.dbo.testCases
        SET sortOrder = sortOrder - (SELECT COUNT(*) FROM @testCaseIds)
        WHERE featureId = @featureId AND sortOrder > @maxSortOrder AND sortOrder <= @newMaxSortOrder;
    END
    ELSE
    BEGIN
        UPDATE main.dbo.testCases
        SET sortOrder = sortOrder + (SELECT COUNT(*) FROM @testCaseIds)
        WHERE featureId = @featureId AND sortOrder >= @newMinSortOrder AND sortOrder < @minSortOrder;
    END

    -- Move the testCases to their new positions
    UPDATE main.dbo.testCases
    SET sortOrder = sortOrder + @amountOfRowsToMove
    WHERE id IN (SELECT testCaseId FROM @testCaseIds);

    -- Finally, reassign sortOrder of each testCase to the row the testCase is on
    WITH cte AS (
        SELECT id, ROW_NUMBER() OVER (ORDER BY sortOrder) AS rowNum
        FROM main.dbo.testCases
        WHERE featureId = @featureId
    )
    UPDATE main.dbo.testCases
    SET sortOrder = cte.rowNum
    FROM main.dbo.testCases tc
    INNER JOIN cte ON tc.id = cte.id;
END;

CREATE PROCEDURE RemoveCompanyUser_new
@companyId INT,
@userId INT
AS
BEGIN
DELETE FROM companyUsers
WHERE companyId = @companyId AND userId = @userId
END;

CREATE PROCEDURE updateCompany
    @id INT,
    @name NVARCHAR(100)
AS
BEGIN
    UPDATE companies
    SET name = @name
    WHERE id = @id;

    -- Add the following SELECT statement to return the updated company object
    SELECT id, name
    FROM companies
    WHERE id = @id;
END;

CREATE PROCEDURE updateFeature
    @id INT,
    @name VARCHAR(50),
    @companyId INT
AS
BEGIN
    DECLARE @updatedFeature TABLE (
        id INT,
        name VARCHAR(50),
        companyId INT
    );

    UPDATE features
    SET name = @name, companyId = @companyId
    OUTPUT inserted.id, inserted.name, inserted.companyId INTO @updatedFeature
    WHERE id = @id;

    SELECT id, name, companyId
    FROM @updatedFeature;
END;

CREATE  PROCEDURE UpdateSingleTestResult
    @testResultId int,
    @singleResultJson nvarchar(MAX)
AS
BEGIN
    DECLARE @resultsJson nvarchar(MAX);
    DECLARE @testCaseId int;
    DECLARE @jsonToUpdate NVARCHAR(MAX);
    DECLARE @indexToUpdate INT;

    -- Extract the testCaseId from the singleResultJson
    SET @testCaseId = JSON_VALUE(@singleResultJson, '$.testCaseId');

    -- Get the current resultsJson for the given testResultId
    SELECT @resultsJson = resultsJson FROM main.dbo.testResults WHERE testResultId = @testResultId;

    -- Check if the testCaseId already exists in the resultsJson
    IF EXISTS (SELECT 1 FROM OPENJSON(@resultsJson) WHERE JSON_VALUE([value], '$.testCaseId') = @testCaseId)
    BEGIN
        -- If the testCaseId exists, find its index (only take the first match)
        SET @indexToUpdate = (SELECT TOP 1 [key] FROM OPENJSON(@resultsJson) WHERE JSON_VALUE([value], '$.testCaseId') = @testCaseId);

        -- Replace the existing singleResultJson object with the new one
        SET @jsonToUpdate = JSON_MODIFY(@resultsJson, '$[' + CAST(@indexToUpdate AS NVARCHAR(MAX)) + ']', JSON_QUERY(@singleResultJson));
    END
    ELSE
    BEGIN
        -- If the testCaseId does not exist, add the new singleResultJson to the resultsJson
        SET @jsonToUpdate = JSON_MODIFY(@resultsJson, 'append $', JSON_QUERY(@singleResultJson));
    END

    -- Update the testResults table
    UPDATE main.dbo.testResults
    SET resultsJson = @jsonToUpdate
    WHERE testResultId = @testResultId;
END;

CREATE PROCEDURE dbo.UpdateSortOrderForDuplicates
    @featureId int
AS
BEGIN
    SET NOCOUNT ON;

    -- Create a new SortOrder for all TestCases in this Feature
    WITH CTE AS (
        SELECT id, 
               ROW_NUMBER() OVER (ORDER BY "sortOrder", id) as NewSortOrder
        FROM testCases
        WHERE featureId = @featureId
    )
    UPDATE testCases
    SET "sortOrder" = CTE.NewSortOrder
    FROM testCases
    INNER JOIN CTE ON testCases.id = CTE.id;
END;

CREATE  PROCEDURE [dbo].[updateTestCase]
    @id int,
    @featureId int = NULL,
    @name varchar(50) = NULL,
    @parentId int = NULL,
    @sortOrder int = NULL
AS
BEGIN
    UPDATE dbo.testCases
    SET featureId = ISNULL(@featureId, featureId),
        name = ISNULL(@name, name),
        parentId = ISNULL(@parentId, parentId),
        sortOrder = ISNULL(@sortOrder, sortOrder)
    OUTPUT inserted.id, inserted.featureId, inserted.name, inserted.parentId, inserted.sortOrder
    WHERE id = @id;
END;

--EXEC UpdateTestCasesOffset @operation = 'INCREMENT', @testCaseIdList = '41,32,37';

--EXEC GetAllTestCasesByFeatureId @featureId = 2; 

CREATE  PROCEDURE UpdateTestCasesOffset
    @operation varchar(10),
    @testCaseIdList varchar(max)
AS
BEGIN
    -- Create the temporary table
    CREATE TABLE #testCaseIds
    (
        id int
    );

    -- Split the comma-separated string and populate the temporary table
    DECLARE @XML xml;
    SET @XML = '<i>' + REPLACE(@testCaseIdList, ',', '</i><i>') + '</i>';

    INSERT INTO #testCaseIds (id)
    SELECT x.i.value('.', 'int')
    FROM @XML.nodes('//i') AS x(i);

    IF @operation = 'INCREMENT'
    BEGIN
        UPDATE testCases
        SET "offset" = "offset" + 1
        WHERE id IN (SELECT id FROM #testCaseIds);
    END
    ELSE IF @operation = 'DECREMENT'
    BEGIN
        UPDATE testCases
        SET "offset" = CASE
                                WHEN "offset" > 1 THEN "offset" - 1
                                ELSE "offset"
                            END
        WHERE id IN (SELECT id FROM #testCaseIds);
    END
    ELSE
    BEGIN
        -- Invalid operation
        RAISERROR('Invalid operation specified. Use INCREMENT or DECREMENT.', 16, 1);
    END
END;

CREATE  PROCEDURE UpdateTestResults
    @testResultId int,
    @newResultsJson nvarchar(MAX) = NULL,
    @date date = NULL,
    @userId int = NULL,
    @featureId int = NULL
AS
BEGIN
    UPDATE main.dbo.testResults
    SET 
        resultsJson = ISNULL(@newResultsJson, resultsJson),
        date = ISNULL(@date, date),
        userId = ISNULL(@userId, userId),
        featureId = ISNULL(@featureId, featureId)
    WHERE testResultId = @testResultId;
END;

--SELECT * FROM testRuns tr  ;



--EXEC CreateTestRunCase @testRunId = 1, @testCaseId = 3, @testCaseStatus = 1, @testCaseComment = "pppRwoooorrrk" ;

CREATE  PROCEDURE dbo.updateTestRun
    @id INT,
    @name VARCHAR(50),
    @date DATE,
    @userId INT,
    @startTime DATETIME2,
    @endTime DATETIME2,
    @testRunStatus INT
AS
BEGIN
    UPDATE dbo.testRuns
    SET name = @name,
        date = @date,
        userId = @userId,
        startTime = @startTime,
        endTime = @endTime,
        testRunStatus = @testRunStatus
    WHERE id = @id;
END;

-- UpdateTestRunCase
CREATE PROCEDURE dbo.updateTestRunCase
  @id int,
  @testRunId int,
  @testCaseId int,
  @testCaseStatus int,
  @testCaseComment nvarchar(255)
AS
BEGIN
  UPDATE dbo.testRunCases
  SET testRunId = @testRunId,
      testCaseId = @testCaseId,
      testCaseStatus = @testCaseStatus,
      testCaseComment = @testCaseComment
  WHERE id = @id;
END;

CREATE PROCEDURE dbo.updateUser
    @id INT,
    @name NVARCHAR(50),
    @email NVARCHAR(100),
    @passwordHash VARBINARY(64)
AS
BEGIN
    UPDATE users
    SET name = @name,
        email = @email,
        passwordHash = @passwordHash
    WHERE id = @id;

    -- Return the updated user details
    SELECT * FROM users WHERE id = @id;
END;






-- Inserting companies
INSERT INTO main.dbo.companies (name) VALUES ('Company A');
INSERT INTO main.dbo.companies (name) VALUES ('Company B');
INSERT INTO main.dbo.companies (name) VALUES ('Company C');

-- Inserting statuses
INSERT INTO main.dbo.statuses (name) VALUES ('Status A');
INSERT INTO main.dbo.statuses (name) VALUES ('Status B');
INSERT INTO main.dbo.statuses (name) VALUES ('Status C');

-- Inserting users with a simple password hash
INSERT INTO main.dbo.users (name, email, passwordHash) VALUES ('User A', 'usera@example.com', HASHBYTES('SHA2_256', 'passwordA'));
INSERT INTO main.dbo.users (name, email, passwordHash) VALUES ('User B', 'userb@example.com', HASHBYTES('SHA2_256', 'passwordB'));
INSERT INTO main.dbo.users (name, email, passwordHash) VALUES ('User C', 'userc@example.com', HASHBYTES('SHA2_256', 'passwordC'));

-- Assign users to companies
INSERT INTO main.dbo.companyUsers (companyId, userId) VALUES (1, 1);
INSERT INTO main.dbo.companyUsers (companyId, userId) VALUES (2, 2);
INSERT INTO main.dbo.companyUsers (companyId, userId) VALUES (3, 3);

-- Inserting features for the companies
INSERT INTO main.dbo.features (name, companyId) VALUES ('Feature A', 1);
INSERT INTO main.dbo.features (name, companyId) VALUES ('Feature B', 2);
INSERT INTO main.dbo.features (name, companyId) VALUES ('Feature C', 3);

-- Inserting test cases for the features
INSERT INTO main.dbo.testCases (featureId, name, sortOrder) VALUES (1, 'Test Case A', 1);
INSERT INTO main.dbo.testCases (featureId, name, sortOrder) VALUES (2, 'Test Case B', 1);
INSERT INTO main.dbo.testCases (featureId, name, sortOrder) VALUES (3, 'Test Case C', 1);


-- Inserting test runs
INSERT INTO main.dbo.testRuns (name, [date], userId, startTime, endTime, testRunStatus) VALUES ('Test Run A', GETDATE(), 1, GETDATE(), DATEADD(HOUR, 1, GETDATE()), 1);
INSERT INTO main.dbo.testRuns (name, [date], userId, startTime, endTime, testRunStatus) VALUES ('Test Run B', GETDATE(), 2, GETDATE(), DATEADD(HOUR, 1, GETDATE()), 2);
INSERT INTO main.dbo.testRuns (name, [date], userId, startTime, endTime, testRunStatus) VALUES ('Test Run C', GETDATE(), 3, GETDATE(), DATEADD(HOUR, 1, GETDATE()), 3);

--Sure, here is a simple script that will insert test data into your tables:


-- Insert into companies
INSERT INTO main.dbo.companies (name)
VALUES ('Company 1'), ('Company 2'), ('Company 3');

-- Insert into statuses
INSERT INTO main.dbo.statuses (name)
VALUES ('Status 1'), ('Status 2'), ('Status 3');

-- Insert into users
-- For simplicity, passwordHash is filled with arbitrary binary data
INSERT INTO main.dbo.users (name, email, passwordHash)
VALUES 
('User 1', 'user1@example.com', 0x0123456789ABCDEF),
('User 2', 'user2@example.com', 0x0123456789ABCDEF),
('User 3', 'user3@example.com', 0x0123456789ABCDEF);











-- Correct testResults
-- featureId 1
INSERT INTO testResults (featureId, resultsJson, userId, date)
VALUES (
    1, 
    '[
        {"testCaseId": 1, "singleResult": "pass", "comment": "example comment"}, 
        {"testCaseId": 4, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 5, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 6, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 7, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 8, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 9, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 10, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 11, "singleResult": "pass", "comment": "example comment"}, 
        {"testCaseId": 12, "singleResult": "fail", "comment": "example comment"}
    ]', 
    1, 
    GETDATE()
);

INSERT INTO testResults (featureId, resultsJson, userId, date)
VALUES (
    1, 
    '[
        {"testCaseId": 1, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 4, "singleResult": "pass", "comment": "example comment"}, 
        {"testCaseId": 5, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 6, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 7, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 8, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 9, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 10, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 11, "singleResult": "pass", "comment": "example comment"}, 
        {"testCaseId": 12, "singleResult": "fail", "comment": "example comment"}
    ]', 
    1, 
    GETDATE()
);

-- featureId 2
INSERT INTO testResults (featureId, resultsJson, userId, date)
VALUES (
    2, 
    '[
        {"testCaseId": 2, "singleResult": "pass", "comment": "example comment"}, 
        {"testCaseId": 14, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 15, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 16, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 17, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 18, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 19, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 20, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 21, "singleResult": "pass", "comment": "example comment"}, 
        {"testCaseId": 22, "singleResult": "fail", "comment": "example comment"}
    ]', 
    1, 
    GETDATE()
);

INSERT INTO testResults (featureId, resultsJson, userId, date)
VALUES (
    2, 
    '[
        {"testCaseId": 2, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 14, "singleResult": "pass", "comment": "example comment"}, 
        {"testCaseId": 15, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 16, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 17, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 18, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 19, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 20, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 21, "singleResult": "pass", "comment": "example comment"}, 
        {"testCaseId": 22, "singleResult": "fail", "comment": "example comment"}
    ]', 
    1, 
    GETDATE()
);