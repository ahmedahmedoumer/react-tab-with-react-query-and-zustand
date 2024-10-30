import { useQuery, useQueryClient } from '@tanstack/react-query';

const fetchLoremParagraphs = async (paragraph) => {
    const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(
        `https://loripsum.net/api/${paragraph}/short/plaintext`
    )}`);
    const text = await response.text();
    return text;
};

export const useFetchContents = (paragraph) => {
    const queryClient = useQueryClient();

    const prefetchNextContent = (nextParagraph) => {
        queryClient.prefetchQuery({
            queryKey: ['fetchContents', nextParagraph],
            queryFn: () => fetchLoremParagraphs(nextParagraph),
        });
    };

    const query = useQuery({
        queryKey: ['fetchContents', paragraph],
        queryFn: () => fetchLoremParagraphs(paragraph),
        staleTime: 5 * 60 * 1000,
        cacheTime: 3 * 60 * 1000,
    });

    return {
        ...query,
        prefetchNextContent,
        invalidateContent: () => 
            query.isSuccess && queryClient.invalidateQueries({ queryKey: ['fetchContents', paragraph] })
    };
};
