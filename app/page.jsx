import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import getListings from './action/getListings';
import ListingCard from './components/listings/ListingCard';
import getCurrentUser from "./action/getCurrentUser";


const Home = async ({searchParams}) => {
  console.log("search params", searchParams)
  const listings = await getListings({params: searchParams});
  const currentUser = await getCurrentUser();
  if(listings.length === 0){
    return(
      <ClientOnly>
         <EmptyState showReset />
      </ClientOnly>
    )
  }

  const simulateRandomError = () => {
    if (Math.random() < 0.5) {
      throw new Error('Random error occurred');
    }
  };

  // Call this function somewhere in your component to simulate random errors
  simulateRandomError();
  return (
     <ClientOnly>
      <Container>
        <div className=" pt-20 grid
        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map(listing => {
            return (
              <ListingCard
              currentUser={currentUser}
              key={listing.id} 
              data={listing}/>
            )
          })}
        </div>
      </Container>
     </ClientOnly>
  );
}

export default Home
