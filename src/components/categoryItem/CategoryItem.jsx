import Chip from '@mui/material/Chip';

const CategoryItem = (props) =>{
    if(props.singlePost){
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
    else{
        return (
            <Chip
                label={props.category}
                component="span"
                href={`/?category=${props.category}#posts`}
                variant="outlined"
                clickable
            />
        )
    }
}

export default CategoryItem;