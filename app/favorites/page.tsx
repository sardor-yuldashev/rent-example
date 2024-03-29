import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../action/getCurrentUser";
import getFavoriteListings from "../action/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

export const dynamic = 'force-dynamic';
// export const dynamicParams = true;

const ListingPage = async () => {

    const currentUser = await getCurrentUser();
    const listings = await getFavoriteListings();

    if(listings.length == 0){
        return (
            <ClientOnly>
                <EmptyState
                    title="No favorites found"
                    subtitle="Looks like you have no favorite listings."
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <FavoritesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    );


}

export default ListingPage;