import { HTMLAttributes } from "react";

interface PostItemProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  createAt: string;
}

export const PostItem: React.FC<PostItemProps> = ({
  title,
  description,
  createAt,
  ...rest
}) => (
  <div className="h-80 text-white" {...rest}>
    {title}
    {description}
    {createAt}
  </div>
);
