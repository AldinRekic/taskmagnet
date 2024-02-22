"use client";

import { toast } from "sonner";

import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useProModal } from "@/hooks/use-pro-modal";
import { useEffect, useState } from "react";

interface SubscriptionButtonProps {
	isPro: boolean;
}

export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
	const proModal = useProModal();

	const { execute, isLoading } = useAction(stripeRedirect, {
		onSuccess: (data) => {
			window.location.href = data;
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	const onClick = () => {
		if (isPro) {
			execute({});
		} else {
			proModal.onOpen();
		}
	};

	return (
		<Button onClick={onClick} variant="primary" disabled={isLoading}>
			{isPro ? "Manage subscription" : "Upgrade to pro"}
		</Button>
	);
};
