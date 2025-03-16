import Layout from "../../Layouts/Layout"
import ForumCards from "@/Components/Widget/Forum_Cards";
export default function Forum(){
    return(
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <ForumCards />
                </div>
            </div>
        </Layout>
    )
};