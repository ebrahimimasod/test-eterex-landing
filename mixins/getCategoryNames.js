// import Posts from '~/httpservices/Posts'

export default {
    methods: {
        getCategoryNames(categoriesIds, categories) {
            const categoryNames = []
            categoriesIds.forEach((element) => {
                const category = categories.find((item) => item.id === element)
                categoryNames.push({ id: category.id, name: category.name })
            })

            return categoryNames
        },
    }
}