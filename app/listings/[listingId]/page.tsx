import getCurrentUser from "@/app/action/getCurrentUser";
import getListingsById from "@/app/action/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/action/getReservations";

interface IParams {
    listingId?: string;
};

const ListingPage = async ({params}: {params: IParams}) => {

    const listing = await getListingsById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if(!listing){
        return (
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <ListingClient
                listing={listing}
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
};

export default ListingPage;