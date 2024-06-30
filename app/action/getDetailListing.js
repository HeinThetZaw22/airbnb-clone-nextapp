import { connectToDB } from "../../lib/database";
import Listing from "../../models/listing";


export default async function getDetailListing(listingId){
    try {
        if(!listingId || typeof listingId !== 'string'){
            throw new Error("Invalid listing id");
        }
        
        await connectToDB();
        const listing = await Listing.findById(listingId);
        if(!listing) {
            // throw new Error("Listing not found");
            return null;
        }

        return listing;
    } catch (error) {
        console.error("error fetching listing detail", error.message);
        throw new Error("failed to fetch listing detail");
    }
}