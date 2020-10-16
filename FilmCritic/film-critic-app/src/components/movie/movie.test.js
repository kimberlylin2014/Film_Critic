import React from 'react';
import { shallow } from 'enzyme';
import Movie from './movie.component'

it('Test if Movie component is rendering', () => {
    const mockMovieProp = {Title: 'Taxi', Poster: "https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg", Plot: "Short story."}
    const wrapper = shallow(<Movie {...mockMovieProp}/>)
    expect(wrapper).toMatchSnapshot()
})