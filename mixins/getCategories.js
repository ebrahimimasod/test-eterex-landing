import Posts from '@/httpservices/Posts'

export default {
    async fetch() {
        try {
            const response = await Posts.getCategories();

            const categories = [];

            categories.push({
                id: 'all',
                name: 'همه',
                active: true,
            })

            response.data.forEach((element) => {
                categories.push({
                    id: element.id,
                    name: element.name,
                    active: false,
                })
            })

            return { categories };
        } catch (e) { }
    },
}
