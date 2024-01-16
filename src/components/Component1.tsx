import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Component1: React.FC = () => {
  const [data, setData] = useState<Post[] | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchingData(): Promise<void> {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result: Post[] = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchingData();
  }, []);

  function handleLogout(): void {
    navigate("/first-page");
    localStorage.setItem("login", JSON.stringify(false));
  }

  const rows = (data || []).map((user) => ({
    userId: user.userId,
    id: user.id,
    title: user.title,
    body: user.body,
  }));

  const columns: GridColDef[] = [
    { field: "userId", width: 200, headerClassName: 'super-app-theme--header',
  },
    { field: "id", width: 200, headerClassName: 'super-app-theme--header', },
    { field: "title", width: 390,headerClassName: 'super-app-theme--header', },
    { field: "body", width: 390, headerClassName: 'super-app-theme--header', },
  ];

  return (
    <div>
      <Box display='flex' justifyContent='space-between' paddingX={5} bgcolor="#3e38d1">
        <Typography variant="h5" color='white' >Second Page</Typography>
        <Button
          style={{ background: "#50abe7", width: "10%", color: "white" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
      <Box sx={{ height: 600, width: 1200, marginX:'auto', marginTop: 2 }}>
      <Typography variant="h4" marginY={3} >Component 1</Typography>
        {data ? (
          <DataGrid
              sx={{
                height: 600,
                width: '100%',
                '& .super-app-theme--header': {
                  backgroundColor: 'rgba(101, 151, 201, 0.55)',
                  fontWeight:'900',
                  fontSize:'1.2rem',
                  textTransform:'capitalize'
                },
              }}
            columns={columns}
            rows={rows}
          />
        ) : (
          <Typography variant="h5">Loading...</Typography>
        )}
      </Box>
    </div>
  );
};

export default Component1;
