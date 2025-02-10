import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from "@mui/material";

function SkeletonListItem() {
  return (
    <ListItem>
      <ListItemAvatar>
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
      </ListItemAvatar>
      <ListItemText primary={<Skeleton />} secondary={<Skeleton />} />
    </ListItem>
  );
}

export default SkeletonListItem;
