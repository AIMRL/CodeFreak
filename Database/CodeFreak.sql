Create Database DBCodeFreak
Go
Use [DBCodeFreak]
Go
/****** Object:  Database [DBCodeFreak]    Script Date: 10/10/2018 21:11:49 ******/
CREATE DATABASE [DBCodeFreak]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DBCodeFreak', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\DBCodeFreak.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'DBCodeFreak_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\DBCodeFreak_log.ldf' , SIZE = 2048KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [DBCodeFreak] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DBCodeFreak].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DBCodeFreak] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DBCodeFreak] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DBCodeFreak] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DBCodeFreak] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DBCodeFreak] SET ARITHABORT OFF 
GO
ALTER DATABASE [DBCodeFreak] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DBCodeFreak] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [DBCodeFreak] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DBCodeFreak] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DBCodeFreak] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DBCodeFreak] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DBCodeFreak] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DBCodeFreak] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DBCodeFreak] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DBCodeFreak] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DBCodeFreak] SET  DISABLE_BROKER 
GO
ALTER DATABASE [DBCodeFreak] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DBCodeFreak] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DBCodeFreak] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DBCodeFreak] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DBCodeFreak] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DBCodeFreak] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DBCodeFreak] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DBCodeFreak] SET RECOVERY FULL 
GO
ALTER DATABASE [DBCodeFreak] SET  MULTI_USER 
GO
ALTER DATABASE [DBCodeFreak] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DBCodeFreak] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DBCodeFreak] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DBCodeFreak] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
EXEC sys.sp_db_vardecimal_storage_format N'DBCodeFreak', N'ON'
GO
USE [DBCodeFreak]
GO
/****** Object:  Table [dbo].[LoginHistory]    Script Date: 10/10/2018 21:11:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[LoginHistory](
	[LoginHistoryID] [bigint] IDENTITY(1,1) NOT NULL,
	[UserID] [uniqueidentifier] NOT NULL,
	[LoginID] [varchar](50) NOT NULL,
	[MachineIP] [varchar](20) NOT NULL,
	[LoginTime] [datetime] NOT NULL,
 CONSTRAINT [PK_LoginHistory] PRIMARY KEY CLUSTERED 
(
	[LoginHistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Permissions]    Script Date: 10/10/2018 21:11:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Permissions](
	[PermissionId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](50) NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[Modifiedby] [uniqueidentifier] NULL,
	[ModifiedOn] [datetime] NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK_Permissions] PRIMARY KEY CLUSTERED 
(
	[PermissionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PermissionsMapping]    Script Date: 10/10/2018 21:11:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PermissionsMapping](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [int] NOT NULL,
	[PermissionId] [int] NOT NULL,
 CONSTRAINT [PK_PermissionsMapping] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Roles]    Script Date: 10/10/2018 21:11:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Roles](
	[RoleId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](50) NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NULL,
	[IsActive] [bit] NOT NULL,
	[ModifiedBy] [uniqueidentifier] NULL,
	[CreatedBy] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[UserRoles]    Script Date: 10/10/2018 21:11:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserRoles](
	[UserRoleID] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[RoleId] [int] NOT NULL,
 CONSTRAINT [PK_UserRoles] PRIMARY KEY CLUSTERED 
(
	[UserRoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Users]    Script Date: 10/10/2018 21:11:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [uniqueidentifier] NOT NULL,
	[Login] [varchar](50) NOT NULL,
	[Password] [varchar](50) NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Email] [varchar](100) NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ModifiedOn] [datetime] NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [uniqueidentifier] NULL,
	[ModifieBy] [uniqueidentifier] NULL,
	[DateOfBirth] [date] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Permissions] ON 

INSERT [dbo].[Permissions] ([PermissionId], [Name], [Description], [CreatedBy], [CreatedOn], [Modifiedby], [ModifiedOn], [IsActive]) VALUES (1, N'perCanLoginAsOtherUser', N'', 0, CAST(0x0000A96C00E3890B AS DateTime), NULL, NULL, 1)
INSERT [dbo].[Permissions] ([PermissionId], [Name], [Description], [CreatedBy], [CreatedOn], [Modifiedby], [ModifiedOn], [IsActive]) VALUES (2, N'perManageSecurityUsers', N'', 0, CAST(0x0000A96C00E3890B AS DateTime), NULL, NULL, 1)
INSERT [dbo].[Permissions] ([PermissionId], [Name], [Description], [CreatedBy], [CreatedOn], [Modifiedby], [ModifiedOn], [IsActive]) VALUES (3, N'perManageSecurityRoles', N'', 0, CAST(0x0000A96C00E3890B AS DateTime), NULL, NULL, 1)
INSERT [dbo].[Permissions] ([PermissionId], [Name], [Description], [CreatedBy], [CreatedOn], [Modifiedby], [ModifiedOn], [IsActive]) VALUES (4, N'perManageSecurityPermissions', N'', 0, CAST(0x0000A96C00E3890B AS DateTime), NULL, NULL, 1)
INSERT [dbo].[Permissions] ([PermissionId], [Name], [Description], [CreatedBy], [CreatedOn], [Modifiedby], [ModifiedOn], [IsActive]) VALUES (5, N'perViewLoginHistoryReport', N'', 0, CAST(0x0000A96C00E3890B AS DateTime), NULL, NULL, 1)
SET IDENTITY_INSERT [dbo].[Permissions] OFF
SET IDENTITY_INSERT [dbo].[PermissionsMapping] ON 

INSERT [dbo].[PermissionsMapping] ([Id], [RoleId], [PermissionId]) VALUES (1, 2, 1)
INSERT [dbo].[PermissionsMapping] ([Id], [RoleId], [PermissionId]) VALUES (2, 2, 2)
INSERT [dbo].[PermissionsMapping] ([Id], [RoleId], [PermissionId]) VALUES (3, 2, 3)
INSERT [dbo].[PermissionsMapping] ([Id], [RoleId], [PermissionId]) VALUES (4, 2, 4)
INSERT [dbo].[PermissionsMapping] ([Id], [RoleId], [PermissionId]) VALUES (5, 2, 5)
SET IDENTITY_INSERT [dbo].[PermissionsMapping] OFF
SET IDENTITY_INSERT [dbo].[Roles] ON 

INSERT [dbo].[Roles] ([RoleId], [Name], [Description], [CreatedOn], [ModifiedOn], [IsActive], [ModifiedBy], [CreatedBy]) VALUES (2, N'Admin', N'System Admin', CAST(0x0000A96B011F3762 AS DateTime), NULL, 1, NULL, N'0e984725-c51c-4bf4-9960-e1c80e27aba0')
SET IDENTITY_INSERT [dbo].[Roles] OFF
SET IDENTITY_INSERT [dbo].[UserRoles] ON 

INSERT [dbo].[UserRoles] ([UserRoleID], [UserId], [RoleId]) VALUES (2, N'0e984725-c51c-4bf4-9960-e1c80e27aba0', 2)
SET IDENTITY_INSERT [dbo].[UserRoles] OFF
INSERT [dbo].[Users] ([UserId], [Login], [Password], [Name], [Email], [CreatedOn], [ModifiedOn], [IsActive], [CreatedBy], [ModifieBy], [DateOfBirth]) VALUES (N'0e984725-c51c-4bf4-9960-e1c80e27aba0', N'Admin', N'123', N'Admin', N'abc@yahoo.com', CAST(0x0000A96B011E4520 AS DateTime), NULL, 1, NULL, NULL, NULL)
ALTER TABLE [dbo].[Permissions] ADD  DEFAULT ((0)) FOR [CreatedBy]
GO
ALTER TABLE [dbo].[Permissions] ADD  DEFAULT (getutcdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[Permissions] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Roles] ADD  DEFAULT (getutcdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[Roles] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (getutcdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Permissions]  WITH CHECK ADD  CONSTRAINT [FK_Permissions_Users] FOREIGN KEY([Modifiedby])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Permissions] CHECK CONSTRAINT [FK_Permissions_Users]
GO
ALTER TABLE [dbo].[PermissionsMapping]  WITH CHECK ADD  CONSTRAINT [FK_PermissionsMapping_Permissions] FOREIGN KEY([PermissionId])
REFERENCES [dbo].[Permissions] ([PermissionId])
GO
ALTER TABLE [dbo].[PermissionsMapping] CHECK CONSTRAINT [FK_PermissionsMapping_Permissions]
GO
ALTER TABLE [dbo].[PermissionsMapping]  WITH CHECK ADD  CONSTRAINT [FK_PermissionsMapping_Roles] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Roles] ([RoleId])
GO
ALTER TABLE [dbo].[PermissionsMapping] CHECK CONSTRAINT [FK_PermissionsMapping_Roles]
GO
ALTER TABLE [dbo].[Roles]  WITH CHECK ADD  CONSTRAINT [FK_Roles_Users] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Roles] CHECK CONSTRAINT [FK_Roles_Users]
GO
ALTER TABLE [dbo].[UserRoles]  WITH CHECK ADD  CONSTRAINT [FK_UserRoles_Roles] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Roles] ([RoleId])
GO
ALTER TABLE [dbo].[UserRoles] CHECK CONSTRAINT [FK_UserRoles_Roles]
GO
ALTER TABLE [dbo].[UserRoles]  WITH CHECK ADD  CONSTRAINT [FK_UserRoles_Users1] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[UserRoles] CHECK CONSTRAINT [FK_UserRoles_Users1]
GO
USE [master]
GO
ALTER DATABASE [DBCodeFreak] SET  READ_WRITE 
GO
