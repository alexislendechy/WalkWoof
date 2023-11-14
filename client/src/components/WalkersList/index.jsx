import { useEffect } from 'react';
import WalkerProfile from '../WalkerProfile'; 
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_WALKERS } from '../../utils/actions'; // Temporales?
import { useQuery } from '@apollo/client';
import { QUERY_WALKERS } from '../../utils/queries'; // Temporales?
import { idbPromise } from '../../utils/helpers';


function WalkersList() {
  const [state, dispatch] = useStoreContext();

  const { currentLocation } = state;

  const { loading, data } = useQuery(QUERY_WALKERS); // Temporales?
  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_WALKERS, 
        walkers: data.walkers, 
      });
      data.walkers.forEach((walker) => {
        idbPromise('walkers', 'put', walker);
      });
    } else if (!loading) {
      idbPromise('walkers', 'get').then((walkers) => {
        dispatch({
          type: UPDATE_WALKERS, 
          walkers: walkers, 
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterWalkers() {
    // Assuming each walker has a location property and a function for calculating distance???? Work in progress maybe?
    if (!currentLocation) {
      return state.walkers;
    }

    return state.walkers.filter(
      (walker) => walker.location && walker.calculateDistance(currentLocation) < 10 // Por si los rangos de acción sirve n en leaflet, si no, luego se cambia esto
    );
  }

  return (
    <div className="my-2">
      <h2>Available Pet Walkers:</h2>
      {state.walkers.length ? (
        <div className="flex-row">
          {filterWalkers().map((walker) => (
            <WalkerProfile
              key={walker._id}
              _id={walker._id}

            />
          ))}
        </div>
      ) : (
        <h3>No available pet walkers in your area!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default WalkersList;