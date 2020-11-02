import React from 'react';
import './movie.styles.scss';
import AccessPrivatePageModal from '../accessPrivatePageModal/accessPrivatePageModal.component';

class Movie extends React.Component {
    constructor(props) {
        super(props)
        this.determinePoster = this.determinePoster.bind(this)
        this.displayProperTitleLength = this.displayProperTitleLength.bind(this)
    }

    determinePoster() {
        const {Poster, Title} = this.props;
        if(Poster === 'N/A') {
            // Freepik
            return  <img src='https://www.flaticon.com/svg/static/icons/svg/20/20773.svg' alt={Title} width='100px' height='100px' style={{backgroundColor: '#84a9ac', padding: '0 30px'}}/>
        }
        return  <img src={Poster} alt={Title} width='200px' height='250px'/>
    }

    displayProperTitleLength() {
        const {Title} = this.props;
        if(Title.length > 65) {
            return Title.slice(0, 65) + '...'
        }
        return Title;
    }

    render() {
        const {Plot} = this.props;
        return (
            <div className='Movie'>
                <div className='img'>
                    {this.determinePoster()}
                </div>
                <div className='details'>
                    <h4>{this.displayProperTitleLength()}</h4>
                    <p> {Plot}</p>
                    <div className='public-route text-right'>
                        <AccessPrivatePageModal label='Write A Movie Review!' {...this.props}/>
                    </div>  
                </div>    
            </div>
        )
    }
}

export default Movie;