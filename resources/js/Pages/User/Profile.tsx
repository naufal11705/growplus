import Layout from "@/Layouts/Layout"
import ParentProfile from "@/Components/Widget/ParentProfile"
import ChildProfile from "@/Components/Widget/ChildProfile"
export default function Profile(){
    return(
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8">Profile User</h2>
                    <ParentProfile/>
                    <hr className="h-px my-8 bg-gray-200 border-0"></hr>
                    <ChildProfile/>
                </div>
            </div>
        </Layout>
    )
};