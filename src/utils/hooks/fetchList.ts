"use client";
import { useEffect, useState } from "react";

export function useFetchList<T>(
  fetcher: (params: any) => Promise<any>,
  params: { current: number; pageSize: number }
) {
  const [data, setData] = useState<T[]>([]);
  const [meta, setMeta] = useState<any>({
    current: params.current,
    pageSize: params.pageSize,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetcher(params);
        const result = res?.data?.data?.result ?? [];
        const m = res?.data?.data?.meta ?? {};

        if (!mounted) return;

        setData(result);
        setMeta({
          current: m.current ?? params.current,
          pageSize: m.pageSize ?? params.pageSize,
          total: m.total ?? 0,
          pages: m.pages,
        });
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, [params.current, params.pageSize]);

  return { data, meta, loading };
}
