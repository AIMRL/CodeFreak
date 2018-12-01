




USE [DBCodeFreak]
GO
INSERT [dbo].[Users] ([UserId], [Login], [Password], [Name], [Email], [CreatedOn], [ModifiedOn], [IsActive], [CreatedBy], [ModifieBy], [DateOfBirth]) 
VALUES ('00984725-c51c-4bf4-9960-e1c80e27aba0', 'lahore', '123', 'lahore qalander', 'lq@yahoo.com', CAST(N'2018-09-30T17:22:16.640' AS DateTime), CAST(N'2018-10-30T17:22:16.640' AS DateTime), 1, N'0f984725-c51c-4bf4-9960-e1c80e27aba0', N'01984725-c51c-4bf4-9960-e1c80e27aba0', CAST(N'2018-09-30' AS Date))
INSERT [dbo].[Users] ([UserId], [Login], [Password], [Name], [Email], [CreatedOn], [ModifiedOn], [IsActive], [CreatedBy], [ModifieBy], [DateOfBirth]) VALUES (N'0e984725-c51c-4bf4-9960-e1c80e27aba0', N'Admin', N'123', N'Admin', N'abc@yahoo.com', CAST(N'2018-09-30T17:22:16.640' AS DateTime), NULL, 1, NULL, NULL, NULL)
INSERT [dbo].[Users] ([UserId], [Login], [Password], [Name], [Email], [CreatedOn], [ModifiedOn], [IsActive], [CreatedBy], [ModifieBy], [DateOfBirth]) VALUES (N'11984725-c51c-4bf4-9960-e1c80e27aba0', N'multan', N'123', N'multan sultan', N'ms@yahoo.com', CAST(N'2018-09-30T17:22:16.640' AS DateTime), CAST(N'2018-10-30T17:22:16.640' AS DateTime), 1, N'0f984725-c51c-4bf4-9960-e1c80e27aba0', N'02984725-c51c-4bf4-9960-e1c80e27aba0', CAST(N'2018-09-30' AS Date))
INSERT [dbo].[Users] ([UserId], [Login], [Password], [Name], [Email], [CreatedOn], [ModifiedOn], [IsActive], [CreatedBy], [ModifieBy], [DateOfBirth]) VALUES (N'21984725-c51c-4bf4-9960-e1c80e27aba0', N'islamabad', N'123', N'islamabad lions', N'll@yahoo.com', CAST(N'2018-09-30T17:22:16.640' AS DateTime), CAST(N'2018-10-30T17:22:16.640' AS DateTime), 1, N'0f984725-c51c-4bf4-9960-e1c80e27aba0', N'02984725-c51c-4bf4-9960-e1c80e27aba0', CAST(N'2018-09-30' AS Date))
INSERT [dbo].[Users] ([UserId], [Login], [Password], [Name], [Email], [CreatedOn], [ModifiedOn], [IsActive], [CreatedBy], [ModifieBy], [DateOfBirth]) VALUES (N'31984725-c51c-4bf4-9960-e1c80e27aba0', N'karachi', N'123', N'karachi kings', N'kk@yahoo.com', CAST(N'2018-09-30T17:22:16.640' AS DateTime), CAST(N'2018-10-30T17:22:16.640' AS DateTime), 1, N'0f984725-c51c-4bf4-9960-e1c80e27aba0', N'02984725-c51c-4bf4-9960-e1c80e27aba0', CAST(N'2018-09-30' AS Date))




USE [DBCodeFreak]
GO
SET IDENTITY_INSERT [dbo].[Difficulty] ON 

INSERT [dbo].[Difficulty] ([DifficultyId], [Name], [Description]) VALUES (2, 'sample name', 'sample description')
INSERT [dbo].[Difficulty] ([DifficultyId], [Name], [Description]) VALUES (3, 'arslan', 'boy')
INSERT [dbo].[Difficulty] ([DifficultyId], [Name], [Description]) VALUES (1002, 'wow', 'great sir g')
SET IDENTITY_INSERT [dbo].[Difficulty] OFF




USE [DBCodeFreak]
GO
SET IDENTITY_INSERT [dbo].[ProblemType] ON 

INSERT [dbo].[ProblemType] ([ProblemTypeId], [Name], [Description]) VALUES (1, 'oop', 'this problem is related to oop')
SET IDENTITY_INSERT [dbo].[ProblemType] OFF


USE [DBCodeFreak]
GO
INSERT [dbo].[Problem] ([ProblemId], [AuthorId], [ProblemTypeId], [DifficultyId], [Description], [InputFormat], [OutputFormat], [ConstraintNote], [SampleInput], [SampleOutput], [MaxScore], [NoOfSubmission], [PostDateTime], [NoOfTestCaseFiles]) VALUES (N'02345678-1234-1234-1234-123456789123', N'31984725-c51c-4bf4-9960-e1c80e27aba0', 1, 2, N'this is sample description', N'this is sample input format', N'this is sample output format', N'this is sample constraint', N'this is sample input', N'this is sample output', 10, 5, NULL, 2)
INSERT [dbo].[Problem] ([ProblemId], [AuthorId], [ProblemTypeId], [DifficultyId], [Description], [InputFormat], [OutputFormat], [ConstraintNote], [SampleInput], [SampleOutput], [MaxScore], [NoOfSubmission], [PostDateTime], [NoOfTestCaseFiles]) VALUES (N'12345678-1234-1234-1234-123456789123', N'0e984725-c51c-4bf4-9960-e1c80e27aba0', 1, 2, N'this is sample description', N'this is sample input format', N'this is sample output format', N'this is sample constraint', N'this is sample input', N'this is sample output', 10, 5, NULL, 2)
INSERT [dbo].[Problem] ([ProblemId], [AuthorId], [ProblemTypeId], [DifficultyId], [Description], [InputFormat], [OutputFormat], [ConstraintNote], [SampleInput], [SampleOutput], [MaxScore], [NoOfSubmission], [PostDateTime], [NoOfTestCaseFiles]) VALUES (N'32345678-1234-1234-1234-123456789123', N'31984725-c51c-4bf4-9960-e1c80e27aba0', 1, 2, N'this is sample description', N'this is sample input format', N'this is sample output format', N'this is sample constraint', N'this is sample input', N'this is sample output', 10, 5, NULL, 2)
INSERT [dbo].[Problem] ([ProblemId], [AuthorId], [ProblemTypeId], [DifficultyId], [Description], [InputFormat], [OutputFormat], [ConstraintNote], [SampleInput], [SampleOutput], [MaxScore], [NoOfSubmission], [PostDateTime], [NoOfTestCaseFiles]) VALUES (N'62345678-1234-1234-1234-123456789123', N'31984725-c51c-4bf4-9960-e1c80e27aba0', 1, 2, N'this is sample description', N'this is sample input format', N'this is sample output format', N'this is sample constraint', N'this is sample input', N'this is sample output', 10, 5, NULL, 2)
INSERT [dbo].[Problem] ([ProblemId], [AuthorId], [ProblemTypeId], [DifficultyId], [Description], [InputFormat], [OutputFormat], [ConstraintNote], [SampleInput], [SampleOutput], [MaxScore], [NoOfSubmission], [PostDateTime], [NoOfTestCaseFiles]) VALUES (N'92345678-1234-1234-1234-123456789123', N'31984725-c51c-4bf4-9960-e1c80e27aba0', 1, 2, N'this is sample description', N'this is sample input format', N'this is sample output format', N'this is sample constraint', N'this is sample input', N'this is sample output', 10, 5, NULL, 2)




USE [DBCodeFreak]
GO
INSERT [dbo].[Submission] ([SubmissionId], [UserId], [ProblemId], [Score], [Status], [SubmissionDateTime]) VALUES (N'12345678-1234-1234-1234-123456789123', N'31984725-c51c-4bf4-9960-e1c80e27aba0', N'02345678-1234-1234-1234-123456789123', 20, N'yes', CAST(N'2018-10-30T17:22:16.640' AS DateTime))
INSERT [dbo].[Submission] ([SubmissionId], [UserId], [ProblemId], [Score], [Status], [SubmissionDateTime]) VALUES (N'22345678-1234-1234-1234-123456789123', N'31984725-c51c-4bf4-9960-e1c80e27aba0', N'02345678-1234-1234-1234-123456789123', 20, N'yes', CAST(N'2018-10-30T17:22:16.640' AS DateTime))
INSERT [dbo].[Submission] ([SubmissionId], [UserId], [ProblemId], [Score], [Status], [SubmissionDateTime]) VALUES (N'32345678-1234-1234-1234-123456789123', N'31984725-c51c-4bf4-9960-e1c80e27aba0', N'02345678-1234-1234-1234-123456789123', 20, N'yes', CAST(N'2018-10-30T17:22:16.640' AS DateTime))
INSERT [dbo].[Submission] ([SubmissionId], [UserId], [ProblemId], [Score], [Status], [SubmissionDateTime]) VALUES (N'42345678-1234-1234-1234-123456789123', N'31984725-c51c-4bf4-9960-e1c80e27aba0', N'02345678-1234-1234-1234-123456789123', 20, N'yes', CAST(N'2018-10-30T17:22:16.640' AS DateTime))
INSERT [dbo].[Submission] ([SubmissionId], [UserId], [ProblemId], [Score], [Status], [SubmissionDateTime]) VALUES (N'52345678-1234-1234-1234-123456789123', N'31984725-c51c-4bf4-9960-e1c80e27aba0', N'02345678-1234-1234-1234-123456789123', 20, N'yes', CAST(N'2018-10-30T17:22:16.640' AS DateTime))









