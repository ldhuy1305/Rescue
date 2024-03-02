USE ELEARNING
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE users(
	[id]				varchar			(6)			NOT NULL
,	[first_nm]			nvarchar		(80)		NULL
,	[last_nm]			nvarchar		(80)		NULL
,	[email]				nvarchar		(80)		NULL
,	[tel]				nvarchar		(20)		NULL
,	[user_nm]			nvarchar		(20)		NULL
,	[password]			nvarchar		(255)		NULL
,	[avatar]			nvarchar		(255)		NULL
,	[del_flg]			[int]						NULL
 CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO



