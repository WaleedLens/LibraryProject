import {ExploreTopBooks} from './Components/Exploretopbooks';
import {Carousel} from './Components/Carousel';
import { Heros } from './Components/Heros';
import { LibraryServices } from './Components/LibraryServices';

export const Homepage = () =>{
    return(
        <div>
        
        <ExploreTopBooks />
        <Carousel />
        <Heros/>
        <LibraryServices />
      
        </div>
    );
}