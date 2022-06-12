import React, { createContext, useContext, useEffect, useState } from 'react'

export interface PageLink {
    title: string
    path: string
    isActive: boolean
    isSeparator?: boolean
}

export interface PageDataContextModel {
    pageTitle?: string
    setPageTitle: (_title: string) => void
    pageDescription?: string
    setPageDescription: (_description: string) => void
    pageBreadcrumbs?: Array<PageLink>
    setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => void
}

const PageDataContext = createContext<PageDataContextModel>({
    setPageTitle: (_title: string) => {},
    setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => {},
    setPageDescription: (_description: string) => {},
})

const PageDataProvider = ({ children }: any) => {
    const [pageTitle, setPageTitle] = useState<string>('')
    const [pageDescription, setPageDescription] = useState<string>('')
    const [pageBreadcrumbs, setPageBreadcrumbs] = useState<Array<PageLink>>([])
    const value: PageDataContextModel = {
        pageTitle,
        setPageTitle,
        pageDescription,
        setPageDescription,
        pageBreadcrumbs,
        setPageBreadcrumbs,
    }
    return <PageDataContext.Provider value={value}>{children}</PageDataContext.Provider>
}

function usePageData() {
    return useContext(PageDataContext)
}

const PageTitle = ({ children, description, breadcrumbs }: any) => {
    const { setPageTitle, setPageDescription, setPageBreadcrumbs } = usePageData()
    useEffect(() => {
        if (children) {
            setPageTitle(children.toString())
        }
        return () => {
            setPageTitle('')
        }
    }, [children])

    useEffect(() => {
        if (description) {
            setPageDescription(description)
        }
        return () => {
            setPageDescription('')
        }
    }, [description])

    useEffect(() => {
        if (breadcrumbs) {
            setPageBreadcrumbs(breadcrumbs)
        }
        return () => {
            setPageBreadcrumbs([])
        }
    }, [breadcrumbs])

    return <></>
}

const PageDescription = ({ children }: any) => {
    const { setPageDescription } = usePageData()
    useEffect(() => {
        if (children) {
            setPageDescription(children.toString())
        }
        return () => {
            setPageDescription('')
        }
    }, [children])
    return <></>
}

export { PageDescription, PageTitle, PageDataProvider, usePageData }
