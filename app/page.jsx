import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import getListings from './action/getListings';
import ListingCard from './components/listings/ListingCard';
import getCurrentUser from "./action/getCurrentUser";


const Home = async ({searchParams}) => {
  const listings = await getListings({params: searchParams});
  const currentUser = await getCurrentUser();
  if(listings.length === 0){
    return(
      <ClientOnly>
         <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
     <ClientOnly>
      <Container>
        <div className=" pt-20 grid scroll-smooth
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
        <div className=" flex flex-col pt-10 items-center justify-center gap-4">
          <div className=" text-xl font-bold">Continue Exploring</div>
          <div className=" bg-neutral-900 cursor-pointer py-3 px-5 text-white font-bold rounded-md">Show more</div>
        </div>
      </Container>
     </ClientOnly>
  );
}

export default Home
