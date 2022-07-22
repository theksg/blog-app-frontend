import Chip from '@mui/material/Chip';

const CategoryItem = (props) =>{
    return (
        <Chip
            label={props.category}
            component="a"
            href={`/?category=${props.category}#posts`}
            variant="outlined"
            clickable
        />
    )
}

export default CategoryItem;