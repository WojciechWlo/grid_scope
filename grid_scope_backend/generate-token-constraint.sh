#!/bin/bash


echo "Generate token..."

sqlcmd -S mssql -U sa -P YourStrong!Passw0rd -d grid_scope_db -N -C <<EOF

ALTER TABLE [dbo].[token_blacklist_blacklistedtoken] ADD UNIQUE NONCLUSTERED
(
    [token_id] ASC
)
WITH (
    PAD_INDEX = OFF, 
    STATISTICS_NORECOMPUTE = OFF, 
    SORT_IN_TEMPDB = OFF, 
    IGNORE_DUP_KEY = OFF, 
    ONLINE = OFF, 
    ALLOW_ROW_LOCKS = ON, 
    ALLOW_PAGE_LOCKS = ON, 
    OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF
) ON [PRIMARY]
GO
EOF