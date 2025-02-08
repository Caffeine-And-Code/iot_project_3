import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  IconButtonProps,
  styled,
} from "@mui/material";
import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function DashboardCard({
  children,
  title,
  icon,
  onRedirect,
}: {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
  onRedirect?: () => void;
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: "342px" , width:"342px"}}>
      <CardHeader
        avatar={<Avatar>
            {icon}
        </Avatar>}
        titleTypographyProps={{ variant: "h5" }}
        title={title}
      />
      <CardActions disableSpacing>
        <IconButton onClick={onRedirect}>
          <OpenInNewIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout={"auto"} unmountOnExit>
        <CardContent sx={{ paddingTop:"0px !important",paddingBottom:"0px !important", }}>{children}</CardContent>
      </Collapse>
    </Card>
  );
}

export default DashboardCard;

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));
