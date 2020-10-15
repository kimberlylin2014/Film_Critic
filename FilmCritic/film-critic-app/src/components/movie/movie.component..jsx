import React from 'react';
import './movie.styles.scss';
import AccessPrivatePageModal from '../accessPrivatePageModal/accessPrivatePageModal.component';

const Movie = ({...props}) => {
    const {Title, Year, Poster, Plot, Director, imdbRating, Rated} = props;
    return (
        <div className='Movie'>
            <div className='img'>
                <img src={Poster} alt={Title} width='200px' height='250px'/>
            </div>
            <div className='details'>
                <h4>{Title}</h4>
                <p> {Plot}</p>
                <div className='public-route text-right'>
                    <AccessPrivatePageModal label='View Reviews and More!' {...props}/>
                </div>  
            </div>    
        </div>
    )
}

export default Movie;