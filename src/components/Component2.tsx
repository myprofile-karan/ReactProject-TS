import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import departmentsData from "../../departmentsData";
import { Typography } from "@mui/material";

interface CheckedState {
  [department: string]: {
    [subDepartment: string]: boolean;
  };
  visibility: {
    [department: string]: boolean;
  };
}

export default function Component2() {
  const [checked, setChecked] = React.useState<CheckedState>({
    visibility: {},
  });

  const handleChange = (
    department: string,
    subDepartment: string | null
  ) => {
    setChecked((prevChecked) => {
      const newChecked = { ...prevChecked };

      // Toggle the selected state of the sub-department
      if (subDepartment) {
        newChecked[department] = {
          ...newChecked[department],
          [subDepartment]: !newChecked[department]?.[subDepartment],
        };

        // If all sub-departments are selected, also select the department
        if (
          Object.values(newChecked[department] || {}).every(
            (value) => value
          )
        ) {
          newChecked[department] = {
            ...newChecked[department],
            [subDepartment]: true,
          };
        }
      } else {
        // Toggle the selected state of the department
        newChecked[department] = {
          ...newChecked[department],
        };

        // Toggle the selected state of all sub-departments
        departmentsData
          .find((dep) => dep.department === department)
          ?.sub_departments.forEach((subDep) => {
            newChecked[department][subDep] = !newChecked[department]?.[subDep];
          });
      }

      return newChecked;
    });
  };

  const toggleVisibility = (department: string) => {
    
    setChecked((prevChecked) => ({
      ...prevChecked,
      visibility: {
        ...prevChecked.visibility,
        [department]: !prevChecked.visibility[department],
      },
    }));
  };

  const renderSubDepartments = (department: typeof departmentsData[0]) => {
    if (!checked.visibility[department.department]) {
      return null; // If visibility is false, don't render sub-departments
    }

    return department.sub_departments.map((subDepartment, subIndex) => (
      <div key={subIndex} style={{ marginLeft: '20px' }}>
        <FormControlLabel
          label={subDepartment}
          control={
            <Checkbox
              checked={checked[department.department]?.[subDepartment] || false}
              onChange={() => handleChange(department.department, subDepartment)}
            />
          }
        />
      </div>
    ));
  };

  const renderDepartments = () => {
    return departmentsData.map((department, index) => (
      <div key={index}>
        <FormControlLabel
          label={department.department}
          control={
            <Checkbox
              checked={Object.values(checked[department.department] || {}).every(
                (value) => value
              )}
              indeterminate={
                Object.values(checked[department.department] || {}).some(
                  (value) => value
                ) &&
                !Object.values(checked[department.department] || {}).every(
                  (value) => value
                )
              }
              onChange={() => handleChange(department.department, null)}
            />
          }
        />
        <Button
          variant="outlined"
          size="small"
          onClick={() => toggleVisibility(department.department)}
        >
          +
        </Button>
        {renderSubDepartments(department)}
      </div>
    ));
  };

  return (
    <Box width={1200} marginX="auto" marginY={10}>
      <Typography variant="h4" marginY={3} >
        Component 2
      </Typography>
      {renderDepartments()}
    </Box>
  );
}
